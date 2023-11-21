var express = require('express');
var router = express.Router();
const { MongoConnection } = require('./mongodb/mongodb');
const { Event } = require('./route-util/Event');
const { LoginUtils } = require('./route-util/LoginUtils');
const { Network } = require('./route-util/Network');

/**
 * Called when post request is sent to /event/create
 */
router.post('/', async function(req, res) {
    try {
        let goodLogin = await LoginUtils.verifyLoginReq(req);
        if (goodLogin === true) {
            let event = reqToEvent(req);
            MongoConnection.get().insertData(event, MongoConnection.COLLECTION_E.Events);
            res.send(Network.createResponse("True"));
            console.log(event);
        } else {
            res.send(Network.createResponse("False"));
        }
    } catch(ex) {
        console.log(ex);
        res.send(Network.createResponse("Server Error"));
    }
});

/**
 * Converts a request to an server Event object
 * 
 * @param {*} req 
 * @returns Event object
 */
function reqToEvent(req) {
    const eventHeader = req.headers['event'];
    console.log(eventHeader);
    let event = new Event(eventHeader['title'], eventHeader['description'], eventHeader['author'], eventHeader['eventCap'], eventHeader['eventDate'], eventHeader['address']);
    return event;
}

module.exports = router;