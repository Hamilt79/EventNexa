var express = require('express');
var router = express.Router();

/**
 * Displays the index.html page when the base website is used
 * 
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

/**
 * Redirects the user the the base of
 * the website when they try to access
 * the /home page of the website
 * 
 */
router.get('/home', function(req, res, next) {
	res.redirect('/');
});

module.exports = router;
