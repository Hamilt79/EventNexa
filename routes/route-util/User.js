const { MongoConnection } = require("../mongodb/mongodb");

class User {
    /**
     * Constructor for User
     * 
     * @param {*} username username of user
     * @param {*} email email of user
     * @param {*} passwordHash password hash of user
     */
    constructor(username, email, passwordHash, joinedEvents) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
    }

    // async getEventsFromDB() {
    //     const user = JSON.parse(await MongoConnection.get().queryCollection({ 'username': this.username }, MongoConnection.COLLECTION_E.Users));
    //     const joinedEvents = user.joinedEvents;
    //     return joinedEvents;
    // }

    // async setEventsInDB() {
    //     await MongoConnection.get().updateData({ 'username': this.username }, { $set:{ 'joinedEvents': this.joinedEvents } }, MongoConnection.COLLECTION_E.Users);
    // }

    // /**
    //  * Gets a user from the db by username
    //  * 
    //  * @param {*} username username of user
    //  * @returns new User object
    //  */
    // static async getUserFromDB(username) {
    //     const dbUser = await MongoConnection.get().queryCollection({ 'username': username }, MongoConnection.COLLECTION_E.Users);
    //     return new User(dbUser.username, dbUser.email, dbUser.passwordHash, dbUser.joinedEvents);
    // }
    static async getEmailFromUsername(username) {
        const user = await MongoConnection.get().queryCollection({ username: username }, MongoConnection.COLLECTION_E.Users);
        return user.email;
    }
}

exports.User = User;