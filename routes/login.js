var express = require('express');
var router = express.Router();
const { PasswordUtils } = require('./route-util/PasswordUtils');
const { MongoConnection } = require('./mongodb/mongodb');
const { Network } = require('./route-util/Network');

/**
 * Gets posts requests directed at /login/loginrequest
 * The posts requests directed here should include the
 * user's username and password for verification.
 * The server should return a token that the user will store in 
 * their cookies as an authenticator.
 * When verifying the password it should be sha-512 encoded and
 * checked against the sha-512 encoded password associated with the
 * username
 * 
 */
router.post('/', function(req, res) {
	handleLoginReq(req, res);
});

async function handleLoginReq(req, res) {
	try{
		let correctLogin = await Login.verifyLoginReq(req);

		if (correctLogin) {
			res.send(Network.createResponse("True"));
		} else {
			res.send(Network.createResponse("False"));
		}
	} catch(ex) {
		console.log(ex);
	}
}

class Login {
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

module.exports = router;
exports.Login = Login;
