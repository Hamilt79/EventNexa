var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TestLol' });
});

router.get('/home', function(req, res, next) {
	//res.sendFile(path.join(__dirname, '/../public/index.html'));
	res.redirect('/');
});

module.exports = router;
