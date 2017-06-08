/*
 * Boilerplate server application
 * DO NOT EDIT
 * Please see lib/ServerApplication for furhter instructions
 *
 * */

var throng	= require("throng"),
    ServerApp	= require("./lib/ServerApplication.js"),
    serverApp	= new ServerApp(),
    WORKERS	= process.env.WEB_CONCURRENCY || 1;

function start(){
	serverApp.start();
}

throng(start, {
	workers: WORKERS,
	lifetime: Infinity
});

