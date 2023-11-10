class User {
    /**
     * Constructor for User
     * 
     * @param {*} username username of user
     * @param {*} passwordHash password hash of user
     * @param {*} hostedEvents events the user hosts
     * @param {*} joinedEvents events the user has joined
     */
    constructor(username, passwordHash, hostedEvents, joinedEvents) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.hostedEvents = hostedEvents;
        this.joinedEvents = joinedEvents;
    }

    /**
     * Gets username
     */
    get username() {
        return this.username;
    }
    
    /**
     * Gets password hash
     */
    get passwordHash() {
        return this.passwordHash;
    }

    /**
     * Gets events the user is hosting
     */
    get hostedEvents() {
        return this.hostedEvents;
    }

    /**
     * Gets events th euser has joined
     */
    get joinedEvents() {
        return this.joinedEvents;
    }  
}

exports.User = User;