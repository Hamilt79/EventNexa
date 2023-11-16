const { User } = require('./route-util/User');
const { MongoConnection } = require('./mongodb/mongodb');
const { PasswordUtils } = require('./route-util/PasswordUtils');
const { Network } = require('./route-util/Network');
var express = require('express');
var router = express.Router();

/**
 * Gets post requests sent to registration/createaccount
 * and checks if the registration request is valid. 
 * 
 */
router.post('/', function(req, res) {
	handleRegisterReq(req, res);
});

/**
 * Function for handling the post request to create a user.
 * 
 * @param {*} req Request data
 * @param {*} res Response Data
 * @returns void
 */
async function handleRegisterReq(req, res)
 {
	try{
		const username = req.headers['username'];
		const email = req.headers['email'];
		const password = req.headers['password'];

		let errorMessage = PasswordUtils.verifyPassword(password);
		if (errorMessage != "") {
			res.send(Network.createResponse(errorMessage));
			return;
		}

		let passwordHash = PasswordUtils.createPasswordHash(password);

		let user = new User(username, email, passwordHash);

		let exists = await createUser(user);
		if (exists) {
			res.send(Network.createResponse("User Registered! Please Log In!"));
		} else {
			res.send(Network.createResponse("Username already in use"));
		}
	} catch(ex) {
		console.log(ex);
	}
 }

/**
 * Function for creating a user
 * 
 * @param {User} userObject User object
 * @returns a boolean value that is true if the user was
 * 			created and false if the userame already existed
 */
async function createUser(userObject) {
	if (await MongoConnection.mongoConnection.queryExists({ 'username': userObject.username }, MongoConnection.COLLECTION_E.Users)) {
		return false;
	} else {
		await MongoConnection.mongoConnection.insertData(userObject, MongoConnection.COLLECTION_E.Users);
		return true;
	}
}

module.exports = router;
