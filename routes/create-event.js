var express = require('express');
var router = express.Router();
const { MongoConnection } = require('./mongodb/mongodb');
const { Event } = require('./route-util/Event');
const { EventCap } = require('./route-util/EventCap');
const { Address } = require('./route-util/Address');
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
    // const title = eventHeader['title'];
    // const desc = eventHeader['description'];
    // const author = eventHeader['event-author'];
    // const capJoined = eventHeader['event-cap']['joined'];
    // const capMax = eventHeader['event-cap']['max'];
    // // All time will be stored in UTC on the server and in the user's local time on the client
    // const time = eventHeader['event-time'];
    // const address = eventHeader['event-address'];
    // ToDo: Need to fill out Address.
    //let eventAddress = new Address();
    //let eventCap = new EventCap(capJoined, capMax);
    let event = new Event(eventHeader.title, eventHeader.description, eventHeader.author, eventHeader.eventCap, eventHeader.eventDate, eventHeader.address);
    return event;
}

module.exports = router;