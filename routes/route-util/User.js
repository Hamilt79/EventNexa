class User {
    /**
     * Constructor for User
     * 
     * @param {*} username username of user
     * @param {*} email email of user
     * @param {*} passwordHash password hash of user
     * @param {*} joinedEvents ids of joinedEvents
     */
    constructor(username, email, passwordHash, joinedEvents) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
        this.joinedEvents = joinedEvents;
    }
}

exports.User = User;