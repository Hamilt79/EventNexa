var express = require('express');
var router = express.Router();
const { Network } = require('./route-util/Network');
const { LoginUtils } = require('./route-util/LoginUtils');
const { Response } = require('./route-util/Response');

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
			res.send(Network.createResponse(Response.RESPONSE_E.GOODLOGIN));
		} else {
			res.send(Network.createResponse(Response.RESPONSE_E.BADLOGIN));
		}
	} catch(ex) {
		res.send(Network.createResponse(Response.RESPONSE_E.SERVERERROR));
		console.log(ex);
	}
}

module.exports = router;

