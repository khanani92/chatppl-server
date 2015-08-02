/**
 * Created by muddassir on 26/6/15.
 */
// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'),       // call express
    app        = express(),
    db = require('./app/model/dbCollections'),
    bodyParser = require('body-parser'),
    passport        = require('passport'),
    http = require('http'),
    socketController =  require('./app/controller/socketController');
/** Router file declaration **/
var router = require('./app/routers');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


/** Initialize Passport.js **/
app.use(passport.initialize());

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/', router);

app.use(function(req, res, next) {
    var err = new Error('Not Found URl Not Found');
    err.status = 404;
    next(err);
});



// START THE SERVER
// =============================================================================

var server =  http.createServer(app).listen(port);
console.log('Magic happens on port ' + port);
// Create a Socket.IO server and attach it to the http server
var io = require('socket.io')(server);

// Reduce the logging output of Socket.IO
//io.set('log level',1);

io.on( "connection", function( socket ) {
    console.log( "We have a connection!" +socket.id);
    socket.emit('connected', { message: "You are connected!" });
    socketController.initChat(io, socket);

    socket.on('disconnect', function(){
        console.log( "User is  disconnected"+socket.id);
        //socketJs.disconnect(io,socket)
    });
});


//io.sockets.on('connection', function (socket) {

  //  console.log('client connected'+socket.id);
    //socket.emit('connected', { message: "You are connected!" });
    //socketJs.initChat(io, socket);
   // commentsAndLikes.initChat(io, socket);

    //socket.emit('connected', { message: "You are connected!" });

    // Host Events

    //socket.on('addMeToSocket', socketJs.addMeToSocket);
    //socket.on('joinTheRoom', socketJs.joinTheRoom);
    //socket.on('hostSendMsg', socketJs.hostSendMsg);
    //socket.on('checkSocketConnetion',socketJs.checkSocketConnection)
    //socket.on('disconnect', function(){
    //    socketJs.disconnect(io,socket)
    //});




//});

//app.listen(port);
