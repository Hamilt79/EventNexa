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
		// Creates a hash object
		const hash = crypto.createHash('sha512');
		// Updates the hash object with the text to turn into sha512 hash
		hash.update(password);
		// Getting the hash from the object as a string
		const passwordHash = hash.digest('hex');

		res.send("Pass");
	} catch(ex) {
		console.log(ex);
	}
});

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

function getUsersFile() {

	return FILE;
}

module.exports = router;
