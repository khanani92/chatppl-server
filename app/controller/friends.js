var mongoose = require('mongoose');
var Q = require('q');
var User = mongoose.model('Users');
var Friends = mongoose.model('Friends');
var Userfind = Q.nbind(User.find, User);



exports.saveFriendList = function(req,res){
    var userID = req.body.userID;
    var friend_info = new Friends({
        userID : userID,
        friendsID:[]
    });
    friend_info.save(function(err,data){
        if(err){
            res.send(
                {
                    status:400,
                    msg:"Friend list is not created"+err
                }
            );
        }else{
            res.send(
                {
                    status:200,
                    msg:"Friend list is Created"
                }
            );
        }
    });//>save
};

exports.addFriend = function(req,res){
    var addFriendData = req.body.addFriendData;
    Friends.update(   { _id: addFriendData.userID },{ $push: { friendsID: addFriendData.friendsID } },function(err,data){
        if(data == 0){
            res.send("error");
            res.send(
                {status:400,
                    msg:"addition of this friend failed"
                }
            );
        }else{
            res.send(
                {
                    status:200,
                    msg:"Friend added successfully"
                }
            );
        }
    })
};

exports.findAllFriends = function(req,res){
    var userID=req.body.userID;
    var key=req.body.key;
    var query;
    if(userID){
        query = {userID:userID}
    }else{
        query={}
    }
    findOneFriendList(query).then(function(data){
        console.log(data);
        return   getfriendsInfo(data)
    }).then(function(data2){
        // console.log(data2)
        res.send(data2)
    })
};

var findOneFriendList = function(query){
    var deferred = Q.defer();
    var result ;
    Friends.find(query,function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            result = err;

        }
        else {
            if(!data){
                console.log('record not found');
                result = {}

            }else{
                result =  deferred.resolve(data);
                console.log(result)
                //res.send(data);
            }//else  for data forward

        }//Main else

    })//FindOne funtionx
    return deferred.promise;
}

var getfriendsInfo = function(data){

    var result ;

    var finalData = [];
    if(data.length >0){

        var promises = data.map(friendsCount); // don't use forEach, we get something back
        return Q.all(promises);

    }else{
        return {msg:"No Friends LIST"};
    }
};

function friendsCount(data2) {
    var friends = data2.friendsID;
    data2.friendsInfo = [];
    for(var i=0; i< friends.length; i++){
        data2.friendsInfo.push({id:friends[i],userInfo:''})
    }

    if(( data2.friendsInfo).length >0){

        var promises2 =  (data2.friendsInfo).map(friendsInfo); // don't use forEach, we get something back
        return Q.all(promises2);
//  ^^^^^^ Rule 1


    }else{
        return  {msg:"no Member Add"};
    }
}

function friendsInfo(friend){
    var id = friend.id

    return Userfind({_id:id})
        //   return   find()
//  ^^^^^^ Rule 1

        .then(function(User) {
//  ^^^^^ Rule 3
            if (!User){
                friend.userInfo = '';
                //   console.log(User)
            }else{
                friend.userInfo = User;
                //console.log(User)
            }
            return friend;
//      ^^^^^^ Rule 3b
        });

}



exports.deleteFriends = function(req,res){
    var deleteFriendData = req.body.deleteFriendData;

    Friends.update(   { _id: deleteFriendData.userID },{ $pull: { friendsID: deleteFriendData.friendsID } },function(err2,data2){
        if(data2 == 0){
            res.send("error");
            res.send({status:400,msg:"addition of this friend failed"});
        }else{
            result = {status:200,msg:"Friend added successfully"}
            res.send(result);
        }

    })
};