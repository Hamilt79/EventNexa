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
}

exports.User = User;