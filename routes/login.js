var express = require('express');
var router = express.Router();
const { PasswordUtils } = require('./route-util/PasswordUtils');

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

function handleLoginReq(req, res) {
	try{
		const username = jsonReq['username'];
		const password = jsonReq['password'];
		
		const passwordHash = PasswordUtils.createPasswordHash(password);

		res.send("Pass");
	} catch(ex) {
		console.log(ex);
	}
}

module.exports = router;
