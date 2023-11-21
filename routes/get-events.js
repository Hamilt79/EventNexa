var express = require('express');
var router = express.Router();
const { MongoConnection } = require('./mongodb/mongodb');
const { Event } = require('./route-util/Event');
const { EventCap } = require('./route-util/EventCap');
const { Address } = require('./route-util/Address');
const { Network } = require('./route-util/Network');
const { LoginUtils } = require('./route-util/LoginUtils');
const { Response } = require('./route-util/Response');

/**
 * Called when post request is sent to /event/get
 */
router.post('/', function(req, res) {
    const verifyLogin = LoginUtils.verifyLoginReq(req);
    if (verifyLogin) {

    } else {
        Network.createResponse(Response.RESPONSE_E.BADLOGIN);
    }
});

module.exports = router;