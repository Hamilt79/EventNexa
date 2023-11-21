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
router.post('/', async function(req, res) {
    try {
    const verifyLogin = LoginUtils.verifyLoginReq(req);
    if (verifyLogin) {
        const filter = JSON.parse(req.headers['filter']);
        const sort = JSON.parse(req.headers['sort']);
        const events = await (await MongoConnection.get().queryCollectionMulti(filter, sort, 10, MongoConnection.COLLECTION_E.Events)).toArray();
        res.send(events);
    } else {
        res.send(Network.createResponse(Response.RESPONSE_E.BADLOGIN));
    }
    } catch(ex) {
        console.log(ex);
        res.send(Network.createResponse(Response.RESPONSE_E.SERVERERROR));
    }
});

module.exports = router;