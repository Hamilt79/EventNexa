var express = require('express');
var router = express.Router();
const { MongoConnection } = require('./mongodb/mongodb');
const { Event } = require('./route-util/Event');
const { EventCap } = require('./route-util/EventCap');

/**
 * Called when post request is sent to /event/create
 */
router.post('/create', function(req, res) {
    
    

});

/**
 * Converts a request to an server Event object
 * 
 * @param {*} req 
 */
function reqToEvent(req) {
    const title = req.headers['event-title'];
    const desc = req.headers['event-description'];
    const author = req.headers['event-author'];
    const capJoined = req.headers['event-cap']['joined'];
    const capMax = req.headers['event-cap']['max'];
    // All time will be stored in UTC on the server and in the user's local time on the client
    const time = req.headers['event-time'];
    const address = req.headers['event-address'];

    let eventCap = new EventCap(capJoined, capMax);
    let event = new Event(title, desc, author, eventCap, time);
}

/**
 * Called when post request is sent to /event/join
 */
router.post('/join', function(req, res) {
    
});

module.exports = router;
exports.Event = Event;