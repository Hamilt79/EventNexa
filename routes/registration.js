const { User } = require('./route-util/User');
const { MongoConnection } = require('./mongodb/mongodb');
const { PasswordUtils } = require('./route-util/PasswordUtils');
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
			res.send(createResponse(errorMessage));
			return;
		}

		let passwordHash = PasswordUtils.createPasswordHash(password);

		let user = new User(username, email, passwordHash);

		let exists = await createUser(user);
		if (exists) {
			res.send(createResponse("User Registered! Please Log In!"));
		} else {
			res.send(createResponse("Username already in use"));
		}
	} catch(ex) {
		console.log(ex);
	}
 }

/**
 * A method to create a response object
 * 
 * @param {string} message an error message to send to the user
 * @returns a response object containing the message
 */
function createResponse(message) {
	const response = {
		'Response': message
	}
	return response;
}

/**
 * Function for creating a user
 * 
 * @param {User} userObject User object
 * @returns a boolean value that is true if the user was
 * 			created and false if the userame already existed
 */
async function createUser(userObject) {
	let mongo = new MongoConnection();
	if (await mongo.queryExists({ 'username': userObject.username }, MongoConnection.COLLECTION_E.Users)) {
		mongo.close();
		return false;
	} else {
		await mongo.insertData(userObject, MongoConnection.COLLECTION_E.Users);
		mongo.close();
		return true;
	}
}

module.exports = router;
