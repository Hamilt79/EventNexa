const { error } = require('console');
const { User } = require('./route-util/user');
const { MongoConnection } = require('./mongodb/mongodb');
const crypto = require('crypto');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * Gets post requests sent to registration/createaccount
 * and checks if the registration request is valid. 
 * 
 */
router.post('/', function(req, res) {
	handlePostReq(req, res);
});

/**
 * Function for handling the post request to create a user.
 * 
 * @param {*} req Request data
 * @param {*} res Response Data
 * @returns void
 */
async function handlePostReq(req, res)
 {
	try{
		const username = req.headers['username'];
		const email = req.headers['email'];
		const password = req.headers['password'];

		let errorMessage = verifyPassword(password);
		if (errorMessage != "") {
			res.send(createResponse(errorMessage));
			return;
		}

		let passwordHash = createPasswordHash(password);

		let user = new User(username, email, passwordHash);

		let exists = await createUser(user);
		if (exists) {
			res.send(createResponse("Created"));
		} else {
			res.send(createResponse("Username already in use"));
		}
	} catch(ex) {
		console.log(ex);
	}
 }

 /**
  * Creates the password hash from password
  * @param {*} password password to make hash from
  * @returns hashed password
  */
function createPasswordHash(password) {
	// Creates a hash object
	const hash = crypto.createHash('sha512');
	// Updates the hash object with the text to turn into sha512 hash
	hash.update(password);
	// Getting the hash from the object as a string
	const passwordHash = hash.digest('hex');
	return passwordHash;
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
 * Method to verify if a password is within the accepted length
 * and contains at least one digit.
 * 
 * @param {string} password a string containing the password to verify
 * @returns A string containing the error message or an empty string if no
 * 			errors occurred
 */
function verifyPassword(password) {
	const MAX_LEN = 20;
	const MIN_LEN = 10;
	let errorMessage = "";
	if (password.length > MAX_LEN || password.length < MIN_LEN) {
		errorMessage = "Password must be between " + MAX_LEN + " and " + MIN_LEN + " characters long.";
	} else if (containsDigit(password) === false) {
		errorMessage = "Password must contain at least one digit.";
	}

	return errorMessage;
}

/**
 * Method checking if a string contains at least one digit.
 * 
 * @param {string} str a string to check
 * @returns true if the string contains a digit, and false if it does not
 */
function containsDigit(str) {
	for (let i = 0; i < str.length; i++) {
		if (str.charAt(i) >= '0' && str.charAt(i) <= 9) {
			return true;
		}
	}
	return false;
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
