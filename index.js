var fs = require("fs");

module.exports.middleware = function(req){
        return require(__dirname + "/lib/middleware")(req);
};

module.exports.getHelpers = function(){
        var features = require("@core/ui-build-scripts").getInstalledFeatures(__dirname);
        var files = fs.readdirSync(__dirname + "/src/helpers");
        var helpers = {};

        features.forEach(function(feature){
                helpers = Object.assign(helpers, require(feature).getHelpers());
        });

        try {
                //now add local helpers to list
                files.forEach(function(file){
                        if(file.indexOf(".js") > -1) {
                                var fileParts = file.split(".");
                                var name = fileParts[0];
                                helpers[name] = require(__dirname + "/src/helpers/" + name);
                        }
                });

        }
        catch(e) {
                console.log('There was an error loading the handlebars helpers:  ', e);
        }

        return helpers;
};


module.exports.getPartials = function(){
        var partialDirectories = [];
        var features = require("@core/ui-build-scripts").getInstalledFeatures(__dirname);
        features.forEach(function(feature){
                partialDirectories.push(__dirname + "/node_modules/" + feature + "/views/partials");
        });
        partialDirectories.push(__dirname + "/node_modules/@core/common/views/partials");
        partialDirectories.push("views/partials");
        return partialDirectories;
};
