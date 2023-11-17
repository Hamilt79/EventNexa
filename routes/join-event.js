var express = require('express');
var router = express.Router();
const { MongoConnection } = require('./mongodb/mongodb');
const { Event } = require('./route-util/Event');
const { EventCap } = require('./route-util/EventCap');
const { Address } = require('./route-util/Address');
const { Login } = require('./login');
const { Network } = require('./route-util/Network');

/**
 * Called when post request is sent to /event/join
 */
router.post('/join', function(req, res) {
    
});

module.exports = router;