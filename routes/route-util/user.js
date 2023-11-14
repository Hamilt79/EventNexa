class User {
    /**
     * Constructor for User
     * 
     * @param {*} username username of user
     * @param {*} passwordHash password hash of user
     * @param {*} email email of user
     */
    constructor(username, passwordHash, email) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
    }

    /**
     * Gets username
     */
    get getUsername() {
        return this.username;
    }
    
    /**
     * Gets password hash
     */
    get getPasswordHash() {
        return this.passwordHash;
    }

    get getEmail() {
        return this.email;
    }
}

exports.User = User;