var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('You got this lol');
});
for(let i = 0; i < 10; ++i) {
	let ind = i;
	router.get('/' + ind, function(req, res, next) {  res.send('You got this ' + ind); } );	
	
}

module.exports = router;
