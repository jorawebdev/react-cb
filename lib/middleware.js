var Middleware = require( "@core/middleware" ),
    middleware = new Middleware( "polaris-react-cb" ),
    request = require("request");

middleware.use(function( req, callback ) {
	setTimeout(function(){
		callback( false, {message:"Hello World from React"} );
	}, 1000);
});

module.exports = function( request ) {
    return middleware.getContext( request );
};
