var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("Got request");
	console.log(JSON.stringify(req.headers));
  	//res.sendFile(path.join(__dirname, '/../public/registration/registration.html'));
});

module.exports = router;
