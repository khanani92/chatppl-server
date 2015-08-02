var clients = [];
var localRooms = [];
var qstatus = "";
var Q = require('q');
//var mongoose = require('mongoose');
//var Rooms = mongoose.model('Rooms');
//var Message = mongoose.model('Messages');
var sessionMgm = require('./sessionManagement');
var io;

exports.initChat = function(sio, socket){
    io = sio;
}

//exports.addMeToSocket =  function(data){
//    /* var userCheck = clients.filter(function(user) {
//     return user.userID === data.userID; // filter out appropriate one
//     });*/
//    //var user = sessionMgm.getSessionByUserID(data.userID);
//    //if(user  == null){
//    //    sessionMgm.add({userID:data.userID,socketID:data.socketID})
//    //    //clients.push(data);
//    //    // console.log(clients)
//    //    this.emit('userAdded',data);
//    //    io.sockets.emit('listOfOnlineUser', sessionMgm.getAllMember());
//    //}else{
//    //    this.emit('User is already there in soio.socketscket',data);
//    //}
//
//}





exports.disconnect = function (io,socket){

    /* var userCheck = clients.filter(function(user) {
     return user.socketID === socket.id; // filter out appropriate one
     });*/
    var userSocket = sessionMgm.getSessionBySocketID(socket.id);
    if(userSocket !== null){
        //clients.splice(clients.indexOf(userCheck[0]), 1);
        sessionMgm.remove(socket.id)
        io.sockets.emit('listOfOnlineUser', sessionMgm.getAllMember());
        // console.log(clients)
    }
    //clients.splice(clients.indexOf(data), 1);

}

//exports.checkSocketConnection =  function(data){
//
//    if(this.id == data.socketID){
//
//        // console.log('sessionID match')
//    }else{
//
//        var user = sessionMgm.getSessionByUserID(data.userID);
//        if(user !== null){
//            if(user.socketID == this.id){
//                console.log('same sessinID')
//            }else{
//                sessionMgm.updateSocketID(user,this.id)
//                //clients[clients.indexOf(userCheck[0])].sessionID = data.socketID
//                io.sockets.emit('listOfOnlineUser',  sessionMgm.getAllMember());
//                //console.log(clients)
//            }
//
//        }else{
//            sessionMgm.add({userID:data.userID,socketID:this.id})
//            io.sockets.emit('listOfOnlineUser',  sessionMgm.getAllMember());
//            // console.log(clients)
//        }
//
//    }
//
//
//
//}
//userListTemp2 = function (){
//    io.sockets.emit('listOfOnlineUser',  sessionMgm.getAllMember());
//}
