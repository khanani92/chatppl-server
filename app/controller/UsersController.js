/**
 User controller
 */

var  Bcrypt   = require('bcrypt-nodejs'),
    mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    //nodemailer = require('nodemailer'),
    noreplyEmail = 'abc@abc.com';


//var smtpTransport = nodemailer.createTransport("SMTP",{
//    service: "Gmail",
//    auth: {
//        user: "noreply@theprayableapp.com",
//        pass: "prayerable2014"
//    }
//});



exports.welcome = function(req, res) {
    res.json({ message: 'Welcome!' });
};

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
    //console.log(params);
    var userData = req.body.userData;
    var email = (userData.email).toLowerCase();


    // Password changed so we need to hash it
    //Bcrypt.genSalt(5, function(err, salt) {
    //    if (err) return callback(err);
    //
    //    Bcrypt.hash(user.password, salt, null, function(err, hash) {
    //        if (err) return callback(err);
    //        user.password = hash;
    //        callback();
    //    });
    //});

    User.findOne({email:email},function(err,data){
        if (err) {// ...
            console.log('An error has occurred');
            res.send({
                status:400,
                message:err});
        }else{
            if(!data){
                console.log('record not found');
                var verificationCode =Math.floor((Math.random()+1)*1000000000000);
                var user_info = new User({
                    userName : userData.userName,
                    firstName : userData.firstName,
                    lastName:userData.lastName,
                    email:userData.email,
                    pass:userData.password,
                    location:userData.location,
                    verificationCode:verificationCode,
                    is_private : false
                });
                user_info.save(function(err,data){
                    if(err){
                        res.send({
                            status:400,
                            message:"Registration Fail"+err
                        });
                    }else{
                        res.send( {
                            status:201,
                            message:"User Created",
                            data:{
                                email:data.email,
                                _id:data._id
                            }
                        });
                    }
                });//>save
            }else{
                res.send({
                    status:200,
                    message:'email found'
                });
            }//else  for data forward
        }//Main else
    });//FindOne funtionx
};

exports.login = function(req, res) {
    var userData = req.body.userData;
    var email = (userData.email).toLowerCase();
    var pass = userData.password;
    User.findOne({email:email,pass:pass},function(err,data){
        if (err) {// ...
            console.log('An error has occurred');
            res.send({
                status:400,
                message:err});
        } else {
            if(!data){
                console.log('record not found');
                res.send({
                    status:200,
                    message:'Email or Password have some error'
                });
            }else{
                res.send( {
                    status:202,
                    message:'email found',
                    data:{
                        _id:data._id,
                        email:data.email,
                        firstName:data.firstName,
                        lastName:data.lastName,
                        profilePic: data.profilePic
                    }
                });
            }//else  for data forward
        }//Main else
    });
}

exports.socialLogin = function(req, res) {
    var params = req.body;
    //console.log(params);
    var presentQuery ;
    var result ;
    var key = params.key; //fb,g+,web
    var userData = params.userData;
    if(key == "fb"){
        var fbId = userData.fbID;
        presentQuery={fbId:fbId};
    }
    else if(key == 'g+'){
        var gplusID = userData.gplusID;
        presentQuery={gplusID:gplusID};
    }


    User.findOne(presentQuery,function(err,data){
        if (err) {// ...
            console.log('An error has occurred');
            res.send({status:400,message:err});
        }else{
            if(!data){
                console.log('record not found');
                var user_info ;
                if(key == "fb"){
                    user_info = new User({
                        firstName : userData.firstName,
                        lastName : userData.lastName,
                        email:userData.email,
                        profilePic:userData.profilePic,
                        gender:userData.gender,
                        location:userData.location,
                        fbID:userData.fbID,
                        is_private : false
                    });
                }else if(key == "g"){
                    user_info = new User({
                        firstName : userData.firstName,
                        lastName : userData.lastName,
                        email:userData.email,
                        profilePic:userData.profilePic,
                        gender:userData.gender,
                        location:userData.location,
                        gplusID:userData.gplusID,
                        is_private : false
                    });
                }
                user_info.save(function(err,data){
                    if(err){
                        res.send({
                            status:400,
                            message:"Registration Fail"+err
                        });
                    }else{
                        if(key == "fb"){
                            res.send({
                                status:201,
                                message:"User Created",
                                data:{
                                    firstName:data.firstName,
                                    lastName:data.lastName,
                                    email:data.email,
                                    _id:data.id,
                                    fbID:data.fbID,
                                    profilePic:data.profilePic,
                                    mode:'R'
                                }
                            })
                        }else if(key == "g"){
                            res.send({
                                status:201,
                                message:"User Created",
                                data:{
                                    firstName:data.firstName,
                                    lastName:data.lastName,
                                    email:data.email,
                                    _id:data.id,
                                    gplusID:data.gplusID,
                                    profilePic:data.profilePic,
                                    mode:'R'
                                }
                            });
                        }
                    }
                });//>save
            }else{
                if(key == 'fb'){
                    res.send({
                        status:202,
                        message:"record found",
                        data:{
                            firstName:data.firstName,
                            lastName:data.lastName,
                            email:data.email,
                            _id:data.id,
                            profilePic:data.profilePic
                        }
                    });
                }else if(key == 'g'){
                    res.send({
                        status:202,
                        message:"record found",
                        data:{
                            firstName:data.firstName,
                            lastName:data.lastName,
                            email:data.email,
                            _id:data.id,
                            profilePic:data.profilePic
                        }
                    });
                }

            }//else  for data forward
        }//Main else
    });//FindOne funtionx
};


exports.sendVerificationMail = function(req,res){
    var email = req.body.email;
    var userID = req.body.userID;
    var key = req.body.key;
    var message="";
    User.findOne({_id:userID },function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            res.send('An error has occurred'+err);

        }
        else {
            if(!data){
                console.log('record not found');

                res.send("error");

            }else{
                if(key == 'verify'){
                    message ="Verify your account using this code";

                }else{
                    message = "Reset your Password using this code";
                }

                var mailOption ={
                    from: noreplyEmail, // sender address
                    to: email,//req.query.content.email, // comma separated list of receivers
                    subject: "Verification Code", // Subject line
                    html:'<h3> '+ message+' </h3>' +
                    '<br><br><h3>Security Code:</h3><p>'+data.verificationCode+'</p>'
                };
                //smtpTransport.sendMail(mailOption, function(error, response){
                //    if(error){
                //        console.log(error);
                //        res.send(error)
                //    }else{
                //        console.log("Message sent: " + response.message);
                //        res.send(response)
                //    }
                //});

            }//else  for data forward

        }//Main else

    });//FindOne funtionx
};

exports.verifyUserCode = function(req,res){
    var verificationCode = req.body.verificationCode;
    User.findOne({verificationCode:verificationCode},function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            res.send({
                status:400,
                message:'An error has occurred'+err
            });
        }
        else {
            if(!data){
                console.log('record not found');
                res.send({
                    status:204,
                    message:'wrong verification code'
                });
            }else{
                User.update({_id:data.id},{$set:{verificationCode:''}},function(err2,data2){
                    if(data2 == 0){
                        res.send({
                            status:400,
                            message:'An error has occurred'+err
                        });
                    }else{
                        res.send({
                                status:202,
                                data:{
                                    userProfile:data.id
                                }
                            }
                        );
                    }
                })
            }//else  for data forward
        }//Main else
    });//FindOne funtionx
};//emailCnfm()

exports.getUser = function(req, res) {
    var userId = req.params.id;
    User.findOne({ _id: userId }, '_id firstName lastName email is_private profilePic fbID gplusID location',function(err, user) {
        if(err) {
            console.log(err);
            res.send({status:400,message:err});
        } else {
            res.send(
                {
                    status:202,
                    message:"record found",
                    data:{user:user}
                }
            );
        }
    });

};

exports.getUsers = function(req, res) {
    var searchData = req.body.searchDat; // will get on is_private: false
    User.find(searchData,'_id firstName lastName email is_private profilePic location',function(err, users) {
        if (err) {
            console.log(err);
            res.send({status:400,message:err});
        } else {
            res.send(
                {
                    status:202,
                    message:"record found",
                    data:{users:users}
                }
            );
        }
    });
};

exports.updateUser = function(req, res) {
    var userId = req.params.id;
    var param = req.body;
    User.findOne({ _id: userId }, function(err, user) {
        if(err) {
            console.log(err);
            res.send({status:400,message:err});
        } else {
            //update user
            for (prop in req.body) {
                user[prop] = req.body[prop];
            }
            //save the user
            user.save(function(err) {
                if(err) {
                    console.log(err);
                    res.end();
                } else {
                    res.send(
                        {
                            status:202,
                            message:"User is updated!"
                        }
                    );
                }
            });

        }
    });
};

exports.deleteUser = function(req, res) {
    var userId = req.params.id;
    User.remove({ _id: userId }, function(err) {
        if(err) {
            console.log(err);
            res.send({status:400,message:err});
        } else {
            res.send(
                {
                    status:202,
                    message:"User is deleted"
                }
            );
        }
    });
};

//
//exports.sendEmail = function(req,res){
//    //var emailContent = req.body.emailContent;
//    //var presentQuery ;
//    //
//    //var mailOption ={
//    //    from: noreplyEmail, // sender address  emailContent.senderEmail
//    //    to: emailContent.receiverEmail,//req.query.content.email, // comma separated list of receivers
//    //    subject: "Invitation Email", // Subject line
//    //    html:'<h3>'+emailContent.message+'</h3>' +
//    //    '<br><br><a href="'+emailContent.link+'"/>'+emailContent.link+'</a>'
//    //}
//    //
//    //
//    //smtpTransport.sendMail(mailOption, function(error, response){
//    //    if(error){
//    //        console.log(error);
//    //        res.send(error)
//    //    }else{
//    //        console.log("Message sent: " + response.message);
//    //        res.send(response)
//    //    }
//    //});
//
//}//emailCnfm()
//exports.sendSms = function(req,res){
//    //client.messages.create({
//    //    body: "Sended by Prayable App",
//    //    to: "+19197493001",
//    //    from: "+19192617050"
//    //}, function(err, message) {
//    //    if (err) {
//    //        res.send(err.message);
//    //    }else{
//    //        console.log(message.sid)
//    //    }
//    //    process.stdout.write(message.sid);
//    //});
//}
//
//function verifyPassword(password, callback) {
//    //Bcrypt.compare(password, this.password, function(err, isMatch) {
//    //    if (err) return callback(err);
//    //    callback(null, isMatch);
//    //});
//};
//

exports.logout = function(req, res) {
    res.send({ error: 200, message: 'User is logged out' });
}