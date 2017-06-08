var express	= require('express'),
    exphbs	= require('express-handlebars'),
    path        = require('path'),
    app		= express(),
    http = require( 'http' ),
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
    customAnalyticsURL;

analyticsURL = ( process.env.analyticsURL || "//libs.coremetrics.com/v4.18.130/eluminate.js" );
customAnalyticsURL = ( process.env.customAnalyticsURL || "https://www.macys.com/web20/assets/script/coremetrics/cmcustom.js" );

//environment setting for example
var configs = {
    brand:"MCOM", 
    analytics: analyticsURL,
    customAnalytics: customAnalyticsURL
};


var serviceEndpoint = process.env.XAPI_PAGE_SERVICE || "http://localhost:8081/api/test";
function completeRequest(req, res){

                console.log( "req", req );

                //if we have page-level xapi (experience service) endpoint
                var request = require('request');
                request(serviceEndpoint, function (error, response, body) {
                        if (!error && response.statusCode === 200) {
                                var obj = JSON.parse(body);
                                var context = Object.assign({
                                        layout:'main',
                                        brand:configs.brand,
                                        analyticsURL: configs.analytics,
                                        customAnalytics: configs.customAnalytics
                                }, obj);
                                res.render('main',context);
                        }
                });

        /*
                //if there is NOT a page-level xapi page will compose feature-based services
                join(
                        require('@feature/header').middleware(req),
                        require('@feature/some-feature').middleware(req),
                        function(header, someFeature){
                                var context = Object.assign({
                                    layout:'main',
                                    brand:configs.brand,
                                    analyticsURL: configs.analytics,
                                    customAnalytics: configs.customAnalytics
                                }, header, someFeature);

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
