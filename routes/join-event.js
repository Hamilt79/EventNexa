var express = require('express');
var router = express.Router();
const { MongoConnection } = require('./mongodb/mongodb');
const { Event } = require('./route-util/Event');
const { EventCap } = require('./route-util/EventCap');
const { Address } = require('./route-util/Address');
const { Network } = require('./route-util/Network');
const { LoginUtils } = require('./route-util/LoginUtils');
const { MongoGridFSChunkError } = require('mongodb');

/**
 * Called when post request is sent to /event/join
 */
router.post('/', async function(req, res) {
    try {
        const goodLogin = await LoginUtils.verifyLoginReq(req);
        if (goodLogin) {
            const eventId = req.headers['_id'];
            const eventExists = await MongoConnection.get().queryExists({ '_id': eventId }, MongoConnection.COLLECTION_E.Events);
            if (eventExists) {
                const user = JSON.parse(await MongoConnection.get().queryCollection({ 'username': req.headers['username'] }, MongoConnection.COLLECTION_E.Users));
                const joinedEvents = user.joinedEvents;
                if (joinedEvents == null){
                    joinedEvents = [ eventId ];
                } else {
                    joinedEvents.push(eventId);
                }
                await MongoConnection.get().updateData({ 'username': req.headers['username'] }, { $set:{ 'joinedEvents': joinedEvents } }, MongoConnection.COLLECTION_E.Users);
                res.send(Network.createResponse("Joined"));
            } else {
                res.send(Network.createResponse("Event Does Not Exists."));
            }
        } else {
            res.send(Network.createResponse("Bad Login."));
        }

    }catch(ex) {
        res.send(Network.createResponse("Server Error"));
        console.log(ex);
    }
});



module.exports = router;