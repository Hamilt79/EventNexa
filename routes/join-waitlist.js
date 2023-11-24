var express = require('express');
var router = express.Router();
const { MongoConnection } = require('./mongodb/mongodb');
const { Event } = require('./route-util/Event');
const { EventCap } = require('./route-util/EventCap');
const { Address } = require('./route-util/Address');
const { Network } = require('./route-util/Network');
const { LoginUtils } = require('./route-util/LoginUtils');
const { User } = require('./route-util/User');
const { Response } = require('./route-util/Response');

/**
 * Called when post request is sent to /event/waitlist/join
 */
router.post('/', async function(req, res) {
    try {
        const goodLogin = await LoginUtils.verifyLoginReq(req);
        if (goodLogin) {
            const eventId = req.headers['_id'];
            const eventExists = await Event.exists(eventId);
            const isFull = await Event.isFull(eventId);
            if (isFull) {
                res.send(Network.createResponse(Response.RESPONSE_E.EVENTFULL));
                return;
            }
            if (eventExists) {
                let event = await Event.getEventById(eventId);
                if (event.joinedUsers == null) {
                    event.joinedUsers = [ req.headers['username'] ];
                } else {
                    if (!event.joinedUsers.includes(req.headers['username'])) {
                        event.joinedUsers.push(req.headers['username']);
                    }
                }
                await Event.updateJoined(eventId, event.joinedUsers);
                await Event.updateCap(eventId, new EventCap(event.joinedUsers.length, event.eventCap.max));
                res.send(Network.createResponse(Response.RESPONSE_E.JOINEDEVENT));
            } else {
                res.send(Network.createResponse(Response.RESPONSE_E.NOSUCHEVENT));
            }
        } else {
            res.send(Network.createResponse(Response.RESPONSE_E.BADLOGIN));
        }
    } catch(ex) {
        res.send(Network.createResponse(Response.RESPONSE_E.SERVERERROR));
        console.log(ex);
    }
});



module.exports = router;