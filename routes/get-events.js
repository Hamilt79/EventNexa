var express = require('express');
var router = express.Router();
const { MongoConnection } = require('./mongodb/mongodb');
const { Network } = require('./route-util/Network');
const { LoginUtils } = require('./route-util/LoginUtils');
const { Response } = require('./route-util/Response');
const { ObjectId } = require('mongodb');

const eventLimit = 4;

/**
 * Called when post request is sent to /event/get
 */
router.post('/', async function(req, res) {
    try {
        const verifyLogin = await LoginUtils.verifyLoginReq(req);
        if (verifyLogin) {
            const filter = JSON.parse(req.headers['filter']);
            if(filter._id != null && filter._id != undefined) {
                filter._id = new ObjectId(filter._id);
            }
            const sort = JSON.parse(req.headers['sort']);
            const events = await (await MongoConnection.get().queryCollectionMulti(filter, sort, eventLimit, MongoConnection.COLLECTION_E.Events)).toArray();
            for (let i = 0; i < events.length; i++) {
                if (events[i].joinedUsers != null) {
                    if (events[i].joinedUsers.includes(req.headers['username'])) {
                        events[i].joined = true;
                    } else {
                        events[i].joined = false;
                    }
                    if (events[i].author != req.headers['username']) {
                        events[i].joinedUsers = null;
                    }
                } else {
                    events[i].joined = false;
                }
                if (events[i].waitlistedUsers != null) {
                    if (events[i].waitlistedUsers.includes(req.headers['username'])) {
                        events[i].waitlisted = true;
                    } else {
                        events[i].waitlisted = false;
                    }
                    if (events[i].author != req.headers['username']) {
                        events[i].waitlistedUsers = null;
                    }
                } else {
                    events[i].waitlisted = false;
                }
            }
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