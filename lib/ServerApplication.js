var express	= require('express'),
    exphbs	= require('express-handlebars'),
    path        = require('path'),
    app		= express(),
    http = require( 'http' ),
    https = require('https'),
    request = require( 'request' ),
    exphbs = require( 'express-handlebars' ),
    logger = require('@core/common').getServerLogger(),
    Bluebird = require( 'bluebird' ),
    cookieParser = require( 'cookie-parser' ),
    join = Bluebird.join,
    querystring = require( "querystring" ),
    self = require( ".." ),
    dictionary,
    mware = require("../"),
    analyticsURL,
    customAnalyticsURL,
    moment = require('moment'),
    bodyParser = require("body-parser"),
    db = require('../model/db'),
    mongoose = require('mongoose'),
    projects = require('../model/projects'),
    controller = require('./controller'),
    ComponentBrowser = require("./ComponentBrowser"),
    moduleSchema = require('../model/moduleSchema');
    //moduleSchema = require('../model/dependencies');

analyticsURL = ( process.env.analyticsURL || "//libs.coremetrics.com/v4.18.130/eluminate.js" );
customAnalyticsURL = ( process.env.customAnalyticsURL || "https://www.macys.com/web20/assets/script/coremetrics/cmcustom.js" );

//environment setting for example
var configs = {
    brand:"MCOM",
    analytics: analyticsURL,
    customAnalytics: customAnalyticsURL
};
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var serviceEndpoint = process.env.XAPI_PAGE_SERVICE || "http://localhost:8081/api/test";
function completeRequest(req, res){
/*               console.log( "req", req ); */
                //if we have page-level xapi (experience service) endpoint
                var request = require('request');
                request(serviceEndpoint, function (error, response, body) {
                        if (!error && response.statusCode === 200) {
                                var obj = JSON.parse(body);
				                        console.log("DATA", obj);
                                var context = Object.assign({
                                        layout:'main',
                                        brand:configs.brand,
                                        analyticsURL: configs.analytics,
                                        customAnalytics: configs.customAnalytics
                                }, obj);
                                res.render('main',context);
                        }
                });
	/**/


      //if there is NOT a page-level xapi page will compose feature-based services
  /*    join(
        require("./middleware")(req),
        require('@feature/header').middleware(req),
        require('@feature/footer').middleware(req),
        function(page, header, footer){
          var context = Object.assign({
              layout:'main',
              brand:configs.brand,
              analyticsURL: configs.analytics,
              customAnalytics: configs.customAnalytics
          }, page, header, footer);
          //res.json(context);
          res.render('main',context);
        }
      );
  */
}

module.exports = function(){
	this.start = function(){
		var port = process.env.PORT || configs.port || 8081,
		    mocks = configs.mockservices || {};

		app.use(express["static"](__dirname +'/../dist'));

		var hbs = exphbs.create({
			extname:".hbs",
      partialsDir: self.getPartials(),
      helpers: self.getHelpers()
		});
		app.set('view engine', '.hbs');
    app.use(cookieParser());
		app.engine('.hbs', hbs.engine);
		app.set('views', __dirname + "/../views");

    //defer to EWS/NGINX/AKAMAI to deliver favicon.ico
    app.get('/favicon.ico', function(req, res) {
        res.sendStatus(204);
    });

    //page level apps define routes ONLY!

    app.get('/', function(req, res){
      completeRequest(req, res);
    });
    app.get('/projects', function(req, res) {
      mongoose.model('Project').find({}, function(err, projects) {
        if (err) throw err;

        // object of all the users
        console.log('see projects:', projects);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(projects));
      });
      //res.redirect('/');
    });
    app.post("/publish", function(req, res){
        var shrinkwrapFile = req.body.name || null;
        ComponentBrowser.process(shrinkwrapFile).then((message)=>{
                res.json(message);
        }).catch((e)=>{
                console.error(e);
                res.status(500).json(e);
        });
    });
    //app.post('/changelog', controller.processChangelog);
    //app.post('/addDependency', function(req, res){
      /*
      module.save((err, doc) => {
        if (err){
          console.log('in error: ',err);
          throw err;
        }
        console.log('my model: ', doc);
      })
      */
      /*
      mongoose.model('Dependency').create(req.body, function(err, dependencies) {
        if (err){
          console.log('in error: ',err);
          throw err;
        }

        // object of all the users
        console.log('see dependencies:', dependencies);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(dependencies));
      });
      */
      //res.redirect('/');
    //});
    app.get('/dependenciesDiff', function(req, res) {
      mongoose.model('Dependency').find({'version':'0.19.0'}, function(err, dependencies) {
        if (err) throw err;

        // object of all the users
        //console.log('returning dependencies:', dependencies);
        var arr = [];
        var one = JSON.parse(dependencies[0].content);
        var findV = function(o){
          for(var v in o){
            if(v === 'version'){
              console.log('check: ',v, o[v]);
            }
            if(v === 'dependencies'){
              //console.log(o['dependencies']);
              for(var i in o['dependencies']){
                console.log('found: ', i, o['dependencies'][i]['version']);
                var item = {};
                item[i] = o['dependencies'][i]['version'];
                arr.push(item);
                findV(o['dependencies'][i]);
              }
            }
          }
        };
        findV(one);
        console.log(arr);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(arr));
      });
      //res.redirect('/');
    });

    app.get('/projectDetails', function(req, res) {
      console.log('req.params: ', req.query);
      var token = 'private_token=Ti3KJWDxG2rqsSmNsYAm';
      var urlPackage = 'https://code.devops.fds.com/api/v4/projects/' + req.query.id + '/repository/files/package.json?ref=master&' + token;
      var urlArtifact = 'http://ci-artifacts.devops.fds.com/artifactory/npm-global/@page/' + req.query.name + '/-/@page/';
      var obj = {'details':[]};

      var optionsPackage = {
        host: 'code.devops.fds.com',
        path: '/api/v4/projects/' + req.query.id + '/repository/files/package.json?ref=master&' + token,
        method: 'GET'
      };

      var reqPackage = request(urlPackage, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('in body', body) // Print the body of response.
        } else {
          console.log('in error', error, response.statusCode);
          if(response.statusCode == 404){
            obj = {error:404};
          }
        }
      });


      //Bluebird.all([urlPackage, urlArtifact])
      Bluebird.all([reqPackage])
      .then(function(d) {
        console.log("all: ", d);
      })
      .catch(function(error){
        console.error('err: ', error);
      });

      //res.json(obj);
      //res.sendStatus(200);
      /*
      console.log(obj);
      if(obj.error){
        res.sendStatus(obj.error);
      } else {
        res.status(200).json(obj);
      }
      */
    });
    app.get('/api/test', function(req, res){
      res.status(200).json({foo:"bar"});
    });
    app.get('/status', function(req, res){
      res.sendStatus(200);
    });
    logger.info("server listening on port: " + port);
		app.listen(port);

	};
};
