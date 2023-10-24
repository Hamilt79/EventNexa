const crypto = require('crypto');
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.post('/', function(req, res) {
	try{
		//const jsonReq = JSON.stringify(req.headers);
		const username = req.headers['username'];
		const email = req.headers['email'];
		//const password = jsonReq['password'];
		const password = req.headers['password'];
		const hash = crypto.createHash('sha512');
		console.log(password);
		hash.update(password);
		const passwordHash = hash.digest('hex');
		console.log(passwordHash);
		res.send("Pass");
	} catch(ex) {
		console.log(ex);
	}
});

/*
router.get('/', function(req, res, next) {
	console.log("Got request");
	console.log(JSON.stringify(req.headers));
	res.send("Got it");
  	//res.sendFile(path.join(__dirname, '/../public/registration/registration.html'));
});
*/
module.exports = router;
