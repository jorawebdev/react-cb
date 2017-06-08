//demonstrating commonJS code that runs on both server/client
var _ = require("underscore"),
    moment = require("moment"),
    handlebars = require("handlebars/runtime");

//Example use of simple helper with access to handlebars object
module.exports = function(context){
        return new handlebars.SafeString("<b>sample helper: "+context.partial+"</b>");
};
