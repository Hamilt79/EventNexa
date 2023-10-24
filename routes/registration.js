const crypto = require('crypto');
var express = require('express');
var router = express.Router();
var path = require('path');

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

module.exports = router;
