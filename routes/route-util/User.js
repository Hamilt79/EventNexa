class User {
    /**
     * Constructor for User
     * 
     * @param {*} username username of user
     * @param {*} email email of user
     * @param {*} passwordHash password hash of user
     * @param {*} joinedEvents ids of joinedEvents
     * @param {*} createdEvents ids of createdEvents
     */
    constructor(username, email, passwordHash, joinedEvents, createdEvents) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
        this.joinedEvents = joinedEvents;
        this.createdEvents = createdEvents;
    }
}

exports.User = User;