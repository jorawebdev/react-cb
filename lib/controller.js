var https = require('https'),
    moment = require('moment'),
    bodyParser = require("body-parser"),
    db = require('../model/db'),
    mongoose = require('mongoose'),
    projects = require('../model/projects'),
    moduleSchema = require('../model/moduleSchema');

var Module = mongoose.model('module', moduleSchema);

module.exports = {
    processChangelog: function(req, res){
      //console.log('in req.body: ', req.body, typeof req.body);
      var sw = JSON.parse(req.body.name);
      var buildChangelog = function(jobData){
        //console.log('got jobData: ', jobData);
        Module.findOne({name:sw.name}, function(err, doc){

            if(!doc){
              doc = new Module({
                id: 1,
                versions: [],
                name: sw.name
                //description:'',
                //keywors: [],
                //dependent: [],
                //date: moment().format()
              });
            }

            var deps = {};
            var changelog = [];
            //console.log('1: ', sw.dependencies);
            if(doc.versions.length > 0){
              var latest = doc.versions[doc.versions.length - 1];
              //console.log(latest);
              for(var key in sw.dependencies){
                if(!latest.dependencies[key]){
                  changelog.push("A new module added" + key + "@" + deps[key].version);
                } else {
                  if(sw.dependencies[key].version !== latest.dependencies[key].version){
                    changelog.push("The module" + key + "changed" + sw.dependencies[key].version + "from " + latest.dependencies[key].version);
                  }
                }
                deps[key] = sw.version;
              };

              latest.dependencies.forEach((key)=>{
                if(!sw.dependencies[key]){
                  changelog.push("The module has been removed" + key + "@" + deps[key].version);
                }
              });

              doc.versions.push({version:sw.version, dependencies:deps, changelog: changelog});
              console.log('savedDoc 2: ', doc);
            } else {
              for(var key in sw.dependencies){
                //console.log(sw.dependencies[key], sw.version);
                deps[key] = sw.dependencies[key].version;
              }
              /*
              sw.dependencies.forEach((key)=>{
                deps[key] = sw.version;
              });
              */
              //console.log(sw.dependencies[key]);
              doc.versions.push({version:sw.version, dependencies:deps, changelog: []});
              console.log('savedDoc 1: ', doc);
            }
  /*
            doc.save((err, savedDoc)=>{
              //done
              console.log("changelog: ", changelog, " deps: ", deps);
            })
  */
        });
      }
      //get projects
      https.get('https://code.devops.fds.com/api/v4/groups/polaris?private_token=Ti3KJWDxG2rqsSmNsYAm', function(res){
        var chunks = [];
        res.on('data', function(chunk){
          chunks.push(chunk);
          //console.log('got chunk', chunks.length);
        });
        res.on('end',function(){
            var json = Buffer.concat(chunks);
            var jobData = JSON.parse(json);
            //console.log( jobData );
            buildChangelog(jobData);
        })
      }).on("error", function(e){
        console.log("Got error: " + e.message);
      });
    }
}
