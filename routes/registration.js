const { error } = require('console');
const crypto = require('crypto');
var express = require('express');
var router = express.Router();
const fs = require('fs');

/**
 * Gets post requests sent to registration/createaccount
 * and checks if the registration request is valid. 
 * 
 */
router.post('/', function(req, res) {
	try{
		//const jsonReq = JSON.stringify(req.headers);
		const username = req.headers['username'];
		const email = req.headers['email'];
		const password = req.headers['password'];

		let errorMessage = verifyPassword(password);
		if (errorMessage != "") {
			res.send(createErrorResponse(errorMessage));
			return;
		}

		// Creates a hash object
		const hash = crypto.createHash('sha512');
		// Updates the hash object with the text to turn into sha512 hash
		hash.update(password);
		// Getting the hash from the object as a string
		const passwordHash = hash.digest('hex');

		res.send(createErrorResponse("Pass"));
	} catch(ex) {
		console.log(ex);
	}
});



/**
 * A method to create a response object
 * 
 * @param {string} message an error message to send to the user
 * @returns a response object containing the error message
 */
function createErrorResponse(message) {
	const response = {
		'Error': message
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
 * @param {string} username username of the user
 * @param {string} passHash hash of the user's password
 * @returns a boolean value that is true if the user was
 * 			created and false if the userame already existed
 */
function createUser(username, passHash) {



	return 0;
}

module.exports = router;
