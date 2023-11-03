class User {
    constructor(username, passwordHash, hostedEvents, joinedEvents) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.hostedEvents = hostedEvents;
        this.joinedEvents = joinedEvents;
    }

    get username() {
        return this.username;
    }

    get passwordHash() {
        return this.passwordHash;
    }

    get hostedEvents() {
        return this.hostedEvents;
    }

    get joinedEvents() {
        return this.joinedEvents;
    }  
}

exports.User = User;