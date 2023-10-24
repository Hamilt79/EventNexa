const { Console } = require('console');
var express = require('express');
var router = express.Router();
var path = require('path');
console.error("Error");
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("Got request");
	console.log(JSON.stringify(req.headers));
	res.send("Got it");
  	//res.sendFile(path.join(__dirname, '/../public/registration/registration.html'));
});

module.exports = router;
