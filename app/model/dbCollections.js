var mongoose = require('mongoose');
mongoose.connect('Your mongoDB data base url');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function callback(){
    console.log("db connected");
});


var userSchema = mongoose.Schema({
    userName :String,
    firstName : String,
    lastName:String,
    email: String,
    pass: String,
    profilePic:String,
    fbID:String,
    gplusID:String,
    gender:String,
    location:Array,
    verificationCode:String,
    is_private:Boolean
});

//var groupSchema = mongoose.Schema({
//    userID : String,
//    title:String,
//    description: String,
//    admin:Array,
//    members: Array,
//    display_picture:String,
//    is_searchable:Boolean,
//    prayersID:Array
//});
//
//var prayerSchema = mongoose.Schema({
//    topic:String,
//    description:String,
//    userID:String,
//    prayerCat:String,
//    adminVerified:String,
//    prayerSeen:String
//});
//var requestPrayerSchema = mongoose.Schema({
//    prayer_text : String,
//    group_id :Array,
//    userID:String,
//    journal_id :Array,
//    gps_enabled:Boolean,
//    gps_location:String,
//    newsFeed:Boolean,
//    fbShare:Boolean,
//    twitShare:Boolean,
//    prayerSeen:String,
//    is_notPrivate:Boolean
//});
//var prayerCatSchema = mongoose.Schema({
//    topic:String,
//    description:String,
//    userID:String,
//    adminVerified:String,
//    prayersCount:String
//});
//var journalSchema = mongoose.Schema({
//    userID : String,
//    title:String,
//    entries: Array,
//    description:String,
//    tagsID:Array,
//    CreatedDateTime:Array,
//    eventDate:Array,
//    activityFiles:Array
//
//});
//
//var entriesSchema = mongoose.Schema({
//    userID : String,
//    title:String,
//    prayersID:Array,
//    body:String,
//    passages:String
//
//});
//
var friendsSchema = mongoose.Schema({
    userID : String,
    friendsID:Array
});
//
//var roomsSchema = mongoose.Schema({
//    roomID : String,
//    membersID:Array,
//    is_blocked:Boolean
//});
//var messagesSchema = mongoose.Schema({
//    message:String,
//    roomID : String,
//    membersID:Array,
//    from:String,
//    timeDate:Array,
//    is_read:Boolean
//});
//
//
//var commentSchema = mongoose.Schema({
//    commentText:String,
//    prayerID:String,
//    date:Array,
//    userID:String
//});
//var likeSchema = mongoose.Schema({
//    prayerID:String,
//    userID:String,
//    commentID:String
//});
//
//var notificationSchema  = mongoose.Schema({
//    notificationTypeID:String,
//    byUserID:String,
//    DateTime:Array,
//    isRead:Boolean,
//    forUserID:Array,
//    prayerID:String
//});
//
//var activitySchema = mongoose.Schema({
//    activityTypeID:String,
//    activityTypeID:String,
//    title:String,
//    description:String,
//    userID:String,
//    CreatedDateTime:Array,
//    StartDateTime:Array,
//    EndDateTime:Array
//    //tagsID:Array,
//    //activityFiles:Array
//});
//var activityTypeSchema = mongoose.Schema({
//    title:String,
//    description:String
//});
//var tagSchema = mongoose.Schema({
//    title:String
//});
//
//mongoose.model('Prayers',prayerSchema);
//mongoose.model('requestPrayers',requestPrayerSchema);
//mongoose.model('PrayersCategory',prayerCatSchema);
mongoose.model('Users',userSchema);
//mongoose.model('Groups',groupSchema);
//mongoose.model('Journals',journalSchema);
//mongoose.model('Entries',entriesSchema);
mongoose.model('Friends',friendsSchema);
//mongoose.model('Rooms',roomsSchema);
//mongoose.model('Messages',messagesSchema);
//mongoose.model('Comments',commentSchema);
//mongoose.model('Likes',likeSchema);
//mongoose.model('Activity',activitySchema);
//mongoose.model('Notification',notificationSchema);
//mongoose.model('ActivityType',activityTypeSchema);
//mongoose.model('Tag',tagSchema);
//
