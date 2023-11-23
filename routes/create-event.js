var express = require('express');
var router = express.Router();
const { MongoConnection } = require('./mongodb/mongodb');
const { Event } = require('./route-util/Event');
const { LoginUtils } = require('./route-util/LoginUtils');
const { Network } = require('./route-util/Network');
const { Response } = require('./route-util/Response');

/**
 * Called when post request is sent to /event/create
 */
router.post('/', async function(req, res) {
    try {
        let goodLogin = await LoginUtils.verifyLoginReq(req);
        if (goodLogin === true) {
            let event = reqToEvent(req);
            MongoConnection.get().insertData(event, MongoConnection.COLLECTION_E.Events);
            res.send(Network.createResponse(Response.RESPONSE_E.EVENTCREATED))
        } else {
            res.send(Network.createResponse(Response.RESPONSE_E.BADLOGIN));
        }
    } catch(ex) {
        console.log(ex);
        res.send(Network.createResponse(Response.RESPONSE_E.SERVERERROR));
    }
});

/**
 * Converts a request to an server Event object
 * 
 * @param {*} req 
 * @returns Event object
 */
function reqToEvent(req) {
    const eventHeader = JSON.parse(req.headers['event']);
    const eventMili = new Date(eventHeader['eventDate']).getTime();
    const creationTime = new Date().getTime();
    let event = new Event(eventHeader['title'], eventHeader['description'], eventHeader['author'], eventHeader['eventCap'], eventHeader['eventDate'], eventMili, creationTime, eventHeader['address'], null);
    return event;
}

module.exports = router;