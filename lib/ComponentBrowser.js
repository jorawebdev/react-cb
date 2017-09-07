var https       = require('https'),
    moment      = require('moment'),
    db          = require('../model/db'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),
    projects    = require('../model/projects'),
    moduleSchema= require('../model/moduleSchema');

var Module = mongoose.model('module', moduleSchema)

function getAllProjects(){
  return new Promise((resolve, reject)=>{
    https.get('https://code.devops.fds.com/api/v4/groups/polaris?private_token=Ti3KJWDxG2rqsSmNsYAm', function(res){
      var chunks = []
      res.on('data', function(chunk){
        chunks.push(chunk)
      });
      res.on('end',function(){
        var json = Buffer.concat(chunks)
        resolve(JSON.parse(json))
      });
      res.on("error", function(e){
        console.error("Got error: " + e.message)
        reject(e)
      })
    })
  })
}

function buildDoc(id,projData){
  //console.log(id, projData);
  return new Promise((resolve, reject)=>{
    var doc = new Module({
      gitlabId: id,
      name: projData.name,
      author: projData.author.name,
      authorEmail: projData.author.email,
      description: projData.description,
      keywords: projData.keywords,
      versions: []
    })
    resolve(doc)
  }).catch((e)=>{
    //console.error(e);
    reject(e)
  })
}

function getPackageJSONById(id){
  console.log('in getPackageJSONById: ', id)
  return new Promise((resolve, reject)=>{
    var urlPackage = 'https://code.devops.fds.com/api/v4/projects/' + id + '/repository/files/package.json?ref=master&private_token=Ti3KJWDxG2rqsSmNsYAm'
    https.get(urlPackage, function(res){
      var chunks = []
      res.on('data', function(chunk){
        chunks.push(chunk)
      });
      res.on('end',function(){
        var json = Buffer.concat(chunks)
        var b64string = JSON.parse(json)
        var buf = new Buffer(b64string.content, 'base64')
        //console.log(JSON.parse(buf))
        resolve(JSON.parse(buf))
      });
      res.on("error", function(e){
        console.error("Got error: " + e.message)
        reject(e)
      })
    })
  })
};

function getProjectByName(name){
        return new Promise((resolve, reject)=>{
          getAllProjects().then((projects)=>{
            //console.log(projects.projects)
            for(var i in projects.projects){
              //console.log(name + ' : ', projects.projects[i].name);
              if(name === projects.projects[i].name){//match name to id
                //console.log(projects.projects[i].id)
                resolve(projects.projects[i])
                return
              }
            }
            resolve(projects.projects)
          }).catch((e)=>{
            //console.error(e);
            reject(e)
          })
        })
}

function updateModule(sw,doc){
  console.log('in upadateModule: ', sw.version)
  return new Promise((resolve, reject)=>{
    var deps = {}
    var changelog = []
    var latest = doc.versions[doc.versions.length - 1]
    console.log('latest: ', latest);
    for(var key in sw.dependencies){
      //console.log(key);
      if(!latest.dependencies[key]){
        console.log('not found:', latest.dependencies[key]);
        changelog.push("A new module added" + key + "@" + sw.dependencies[key].version)
      } else if(sw.dependencies[key].version !== latest.dependencies[key]){
        console.log('different: ', sw.dependencies[key].version, + ' : ' + latest.dependencies[key]);
        changelog.push("The module: " + key + " changed from " + latest.dependencies[key] + " to " + sw.dependencies[key].version)
      }
      deps[key] = sw.dependencies[key].version;
    };

    for(var i in latest.dependencies){
      if(!sw.dependencies[i]){
        changelog.push("The module " + i + " has been removed")
      }
    };

    doc.versions.push({version:sw.version, dependencies:deps, changelog: changelog, date: moment().format() })
    console.log('doc saved 2: ', JSON.stringify(doc))
  })
}
function saveModule(sw,doc){
  //console.log('got doc: ', doc)
  console.log('in saveModule:', doc)
  return new Promise((resolve, reject)=>{
    var deps = {}
    var changelog = []
    for(var key in sw.dependencies){
      //console.log(sw.dependencies[key], sw.version);
      deps[key] = sw.dependencies[key].version;
    }

    doc.versions.push({
      version:sw.version,
      date: moment().format(),
      dependencies: deps,
      changelog:[]
    })
    console.log('doc saved 1: ', JSON.stringify(doc))
    /*
    doc.save((err, savedDoc)=>{
      if(err){
        console.log('error on save: ', err)
      } else{
        //done
        console.log(JSON.stringify(savedDoc))
      }
    })
    */
    resolve(doc)
  }).catch((e)=>{
    //console.error(e);
    reject(e);
  })
}

function getPolarisModule(sw){
  return new Promise((resolve, reject)=>{
    Module.findOne({name: sw.name}, function(err, doc){
      if(err){
        console.log('error searching for doc: ', err)
        reject(err)
        return
      }

      if(doc){//doc exists check if version exists
        var versionExist = false
        for(var i = 0; i<doc.versions.length; i++){
          if(sw.version === doc.versions[i].version){// A: version exists
              console.log('version already exists: ', sw.version, ' === ', doc.versions[i].version)
              versionExist = true
              return
          }
        }
        if(versionExist){//if true reject
          reject(e)
        } else {//if false resolve: B: version doesn't exist
          updateModule(sw,doc)
          resolve(doc)
        }
      } else {//doc doesn't exit. instantiate doc and lookup id by name
        console.log('doc doesnt exist')
        var n = sw.name.replace(/^.+\//,'')
        getProjectByName(n).then((polarisModule)=>{
          //console.log('polarisModule: ',polarisModule)
          getPackageJSONById(polarisModule.id).then((projectData)=>{// get proj json
            //console.log('got projectData: ', projectData);
            buildDoc(polarisModule.gitlabId,projectData).then((_doc)=>{
              console.log('doc: ', _doc);
              saveModule(sw,_doc).then((doc)=>{
                resolve(doc)
              })
            }).catch((e)=>{
              //console.error(e);
              reject(e)
            })
            //resolve(projectData)
          }).catch((e)=>{
            //console.error(e);
            reject(e)
          })
          //resolve(polarisModule)//C
        }).catch((e)=>{
          //console.error(e);
          reject(e)
        })
      }
    })
  })
}

//process new shrinkwrap file
module.exports.process = function(shrinkwrapFile){
  return new Promise((resolve, reject)=>{
    if(!shrinkwrapFile){
      reject({error:"Missing required shrinkwrap file"})
    } else {
      var sw = JSON.parse(shrinkwrapFile)
      //console.log(sw.name);

      getPolarisModule(sw).then((doc)=>{// get proj id
        console.log('getPolarisModule: ', doc);
        doc.save((err, doc)=>{
          if(err){
            console.log('error on save: ', err)
          } else{
            //done
            console.log('saved to DB: ', JSON.stringify(doc))
          }
        })
        resolve(doc)
      }).catch((e)=>{
        console.error(e);
        reject(e)
      })
    }
  })
}
/*module.exports = {
    processChangelog: function(req, res){
      var buildChangelog = function(jobData){
        //console.log('got jobData: ', jobData);

      }
    }
}*/
