var sessions = [];

//User roles list
/*var userRoles = {
    Admin: "administrator",
    User: "user",
    Supervisor: "supervisor"
};*/

var sessionManagement = {
    indexOf: function(socketID) {
        for(var i in sessions) {
            if(sessions[i].socketID == socketID)
                return i;
        }

        return null;
    },
    indexOfUser: function(userID) {
        for(var i in sessions) {
            if(sessions[i].userID == userID)
                return i;
        }

        return null;
    },

    add: function(sessionData) {
        sessions.push(sessionData);
    },
    remove: function(socketID) {
        var index = this.indexOf(socketID);
        if(index != null) {
            sessions.splice(index, 1);
        } else {
            return null;
        }
    },
    removeByUserID: function(userID) {
        var index = this.indexOf(userID);
        if(index != null) {
            sessions.splice(index, 1);
        } else {
            return null;
        }
    },

    getSessionBySocketID: function(socketID) {
        /*var index = this.indexOfUser(socketID);
        if(index != null) {
            return sessions[index];
        } else {
            return null;
        }*/
        for(var i in sessions) {
            if(sessions[i].socketID == socketID)
                return sessions[i];
        }

    },
    getSessionByUserID: function(userID) {
        var index = this.indexOfUser(userID);
        if(index != null) {
            return sessions[index];
        } else {
            return null;
        }
    },
    getAllMember:function(){
        return sessions;
    },
    updateSocketID:function(user,socketID){
        sessions[sessions.indexOf(user)].socketID = socketID
    }

    /*isAdmin: function(userID) {
        var index = this.indexOfUser(userID);
        if(index != null) {
            if(users[index].role == userRoles.Admin) {
                return true;
            } else {
                return false;
            }
        } else {
            return null;
        }
    },
    getUsersByRole: function(role) {
        var usersByRole = [];
        for(var i in users) {
            if(users[i].role == role)
                usersByRole.push(users[i]);
        }

        return usersByRole;
    }*/
};

module.exports = sessionManagement;