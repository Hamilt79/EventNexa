var express = require('express');
var router = express.Router();
const { MongoConnection } = require('./mongodb/mongodb');
const { Event } = require('./route-util/Event');
const { EventCap } = require('./route-util/EventCap');
const { Address } = require('./route-util/Address');
const { Network } = require('./route-util/Network');
const { LoginUtils } = require('./route-util/LoginUtils');

/**
 * Called when post request is sent to /event/join
 */
router.post('/', async function(req, res) {
    try {

        const goodLogin = await LoginUtils.verifyLoginReq(req);
        if (goodLogin) {
            
        } else {
            res.send(Network.createResponse("False"));
        }

    }catch(ex) {
        console.log(ex);
    }
});

module.exports = router;