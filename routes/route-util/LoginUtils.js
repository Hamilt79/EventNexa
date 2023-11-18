
class LoginUtils {
	/**
	 * Checks if the login is valid
	 * @param {*} username username of user
	 * @param {*} password password of user
	 * @returns true if it is valid, false otherwise
	 */
	static async verifyLogin(username, password) {
		const passwordHash = PasswordUtils.createPasswordHash(password);
		let loginValid = await MongoConnection.mongoConnection.queryExists( { 'username': username, 'passwordHash': passwordHash }, MongoConnection.COLLECTION_E.Users);
		return loginValid;
	}

	/**
	 * Checks if a login request is valid from the request headers
	 * 
	 * @param {*} req 
	 * @returns true if it is valie, false otherwise
	 */
	static async verifyLoginReq(req) {
		const username = req.headers['username'];
		const password = req.headers['password'];
		const passwordHash = PasswordUtils.createPasswordHash(password);
		let loginValid = await MongoConnection.mongoConnection.queryExists( { 'username': username, 'passwordHash': passwordHash }, MongoConnection.COLLECTION_E.Users);
		return loginValid;
	}
}

exports.LoginUtils = LoginUtils;