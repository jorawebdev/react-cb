console.log("---KARMA---");
module.exports = function(config){
        config.basePath = __dirname;
        var karmaObj = require("@core/ui-build-scripts").getKarmaConfig(config, __dirname);
        var obj = Object.assign({}, karmaObj.webpack.resolve.alias);
        karmaObj.webpack.resolve.alias = obj;
        return karmaObj;
};

