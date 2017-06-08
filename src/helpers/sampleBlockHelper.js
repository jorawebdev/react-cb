//demonstrating commonJS code that runs on both server/client
var _ = require("underscore"),
    moment = require("moment");

module.exports = function(context, options){
        var uuid = _.uniqueId("helloworld___"); 
        return options.fn({id: uuid, timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')}); 
};
