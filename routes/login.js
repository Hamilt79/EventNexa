var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.post('/', function(req, res) {
	try{
		const jsonReq = JSON.stringify(req.headers);
		const username = jsonReq['username'];
		const password = jsonReq['password'];
        
		res.send("Pass");
	} catch(ex) {
		console.log(ex);
	}
});

module.exports = router;
