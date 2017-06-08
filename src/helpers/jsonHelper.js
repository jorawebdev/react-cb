//demonstrating commonJS code that runs on both server/client
var handlebars = require("handlebars/runtime");

module.exports = function(context){
        return new handlebars.SafeString(JSON.stringify(context));
};