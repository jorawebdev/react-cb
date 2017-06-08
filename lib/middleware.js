var Middleware = require( "@core/middleware" ),
    middleware = new Middleware( "polaris-react-2" ),
    request = require("request");

middleware.use(function( req, callback ) {
        var renderMode = req.query.renderMode || "server";
        //if we have page-level xapi (experience service) endpoint
        if(!process.env.XAPI_PAGE_SERVICE){
                throw new Error("Unable to start server. The required environment variable XAPI_PAGE_SERVICE is missing.");
        } 
        var serviceEndpoint = process.env.XAPI_PAGE_SERVICE;
        var context = {};
        if ( renderMode === "server" ) {
                request(serviceEndpoint, function (error, response, body) {
                        if (!error && response.statusCode === 200) {
                                var obj = JSON.parse(body);
                                context = Object.assign({
                                        layout:'main',
                                        brand:req.configs.brand,
                                        analyticsURL: req.configs.analytics,
                                        customAnalytics: req.configs.customAnalytics
                                }, obj);
                                callback( false, context );
                        }
                });
        }
});

module.exports = function( request ) {
    return middleware.getContext( request );
};
