var express = require('express');
var router = express.Router();
const { PasswordUtils } = require('./route-util/PasswordUtils');
const { MongoConnection } = require('./mongodb/mongodb');
const { Network } = require('./route-util/Network');
const { LoginUtils } = require('./route-util/LoginUtils');


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
		let correctLogin = await LoginUtils.verifyLoginReq(req);

		if (correctLogin) {
			res.send(Network.createResponse("True"));
		} else {
			res.send(Network.createResponse("False"));
		}
	} catch(ex) {
		console.log(ex);
	}
}

module.exports = router;

