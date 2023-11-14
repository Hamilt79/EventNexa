class User {
    /**
     * Constructor for User
     * 
     * @param {*} username username of user
     * @param {*} email email of user
     * @param {*} passwordHash password hash of user
     */
    constructor(username, email, passwordHash) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
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

    get email() {
        return this.email;
    }
}

exports.User = User;