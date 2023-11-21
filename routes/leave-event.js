var express = require('express');
var router = express.Router();
const { MongoConnection } = require('./mongodb/mongodb');
const { Event } = require('./route-util/Event');
const { EventCap } = require('./route-util/EventCap');
const { Address } = require('./route-util/Address');
const { Network } = require('./route-util/Network');
const { User } = require('./route-util/User');
const { Response } = require('./route-util/Response');

/**
 * Called when post request is sent to /eventleave
 */
router.post('/', async function(req, res) {
    try {
        const goodLogin = await LoginUtils.verifyLoginReq(req);
        if (goodLogin) {
            const eventId = req.headers['_id'];
            const user = await User.getUserFromDB(req.headers['username']);
            if (user.joinedEvents != null) {
                const filteredEvents = user.joinedEvents.filter(x => { return (x != eventId); });
                user.joinedEvents = filteredEvents;
                await user.setEventsInDB();
            }
            res.send(Network.createResponse("Left"));
        } else {
            res.send(Network.createResponse(Response.RESPONSE_E.BADLOGIN));
        }

    }catch(ex) {
        res.send(Network.createResponse(Response.RESPONSE_E.SERVERERROR));
        console.log(ex);
    }
});

module.exports = router;