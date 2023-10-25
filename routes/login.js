const cyrpto = require('crypto')
var express = require('express');
var router = express.Router();
var path = require('path');

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
	try{
		const jsonReq = JSON.stringify(req.headers);
		const username = jsonReq['username'];
		const password = jsonReq['password'];
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
