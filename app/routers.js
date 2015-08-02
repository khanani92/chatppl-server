/**
 * Created by muddassir on 26/6/15.
 */

var express     = require('express'),        // call express
    app         = express(),      // define our app using express
    bodyParser  = require('body-parser'),
    Passport    = require('passport'),
    Auth        = require('./component/Auth'),
    User        = require('./controller/UsersController'),
    friend      = require('./controller/friends');

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    res.setHeader('Access-Control-Allow-Headers', 'APIKEY, Content-Type','x-requested-with','origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


/** Initialize Passport.js **/
app.use(Passport.initialize());

router.get('/unauthorized', function(req, res) {
    res.json({ message: "The request is Unauthorized" });
});

router.route('/')
    .get(User.welcome);

//////////////////////////////////////////////////
///////////////USER RELATED API's/////////////////
//////////////////////////////////////////////////

/** Create endpoint handlers for /users */
router.route('/login')
    .post(Auth.isAuthenticated, User.login);
router.route('/socialLogin')
    .post(Auth.isAuthenticated, User.socialLogin);

router.route('/socialLogin')
    .post(Auth.isAuthenticated, User.socialLogin);

router.route('/sendVerificationMail')
    .post(Auth.isAuthenticated, User.sendVerificationMail);

router.route('/verifyUserCode')
    .post(Auth.isAuthenticated, User.verifyUserCode);

router.route('/logout')
    .get(Auth.isAuthenticated, User.logout);

router.route('/user')
    .post(Auth.isAuthenticated, User.postUsers);

router.route('/users')
    .post(Auth.isAuthenticated, User.getUsers);
router.route('/user/:id')
    .get(Auth.isAuthenticated, User.getUser)
    .put(Auth.isAuthenticated, User.updateUser)
    .delete(Auth.isAuthenticated, User.deleteUser);

//////////////////////////////////////////////////
///////////////USER RELATED API's/////////////////
//////////////////////////////////////////////////



//////////////////////////////////////////////////
///////////////Friends RELATED API's//////////////
//////////////////////////////////////////////////
router.route('/friendList')
    .post(Auth.isAuthenticated, friend.saveFriendList)

router.route('/friend')
    .post(Auth.isAuthenticated, friend.addFriend)
    .get(Auth.isAuthenticated, friend.findAllFriends)

router.route('/deleteFriend')
    .post(Auth.isAuthenticated, friend.deleteFriends)

//////////////////////////////////////////////////
///////////////Friends RELATED API's//////////////
//////////////////////////////////////////////////



/** Expose router to other modules **/

module.exports = router;