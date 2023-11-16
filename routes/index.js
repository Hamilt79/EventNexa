var express = require('express');
var router = express.Router();

/**
 * Displays the index.html page when the base website is used
 * 
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

module.exports = router;
