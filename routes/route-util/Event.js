const { ObjectId } = require('mongodb');
const { EventCap } = require('./EventCap');
const { MongoConnection } = require('../mongodb/mongodb'); 
const { Response } = require('./Response');
const { EmailNotif } = require('./EmailNotif');

class Event {
    /**
     * Constructor for Event.
     * 
     * @param {String} title title of event
     * @param {String} description description of event
     * @param {String} author username of event creator
     * @param {EventCap} eventCap event cap
     * @param {DateTime} eventDate date event starts in UTC
     * @param {Number} milliTime eventDate.getTime() value
     * @param {Number} creationTime millisecond representation of when event was created
     * @param {Address} address address of event
     * @param {*} joinedUsers usernames of those who have joined
     * @param {*} waitlistedUsers usernames of those who are on the waitlist
     */
    constructor(title, description, author, eventCap, eventDate, milliTime, creationTime, address, joinedUsers, waitlistedUsers) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.eventCap = eventCap;
        this.eventDate = eventDate;
        this.milliTime = milliTime;
        this.creationTime = creationTime;
        this.address = address;
        this.joinedUsers = joinedUsers;
        this.waitlistedUsers = waitlistedUsers;  
    }

    /**
     * Checks if an event exists by its id
     * 
     * @param {*} eventId id of event
     */
    static async exists(eventId) {
        const objId = new ObjectId(eventId);
        const eventExists = await MongoConnection.get().queryExists({ '_id': objId }, MongoConnection.COLLECTION_E.Events);
        return eventExists;
    }

    /**
     * Get an event by it's id. 
     * 
     * @param {*} eventId id to retrieve
     * @returns event object from mongodb
     */
    static async getEventById(eventId) {
        const objID = new ObjectId(eventId);
        return await MongoConnection.get().queryCollection({ '_id': objID }, MongoConnection.COLLECTION_E.Events);
    }

    /**
     * Update event's joined users
     * 
     * @param {*} eventId event id of event to update
     * @param {*} joinedUsers new joinedUsers object
     */
    static async updateJoined(eventId, joinedUsers) {
        const objId = new ObjectId(eventId);
        await MongoConnection.get().updateData({ '_id': objId }, { $set: { 'joinedUsers': joinedUsers }}, MongoConnection.COLLECTION_E.Events );
    }

    /**
     * Updates event's waitlisted users
     * 
     * @param {*} eventId event id of event to update 
     * @param {*} waitlistedUsers new waitlistedUsers object
     */
    static async updateWaitlist(eventId, waitlistedUsers) {
        const objId = new ObjectId(eventId);
        await MongoConnection.get().updateData({ '_id': objId }, { $set: { 'waitlistedUsers': waitlistedUsers } }, MongoConnection.COLLECTION_E.Events);
    }


    /**
     * Updates event cap
     * 
     * @param {*} eventId id of event to update
     * @param {*} eventCap new event cap
     */
    static async updateCap(eventId, eventCap) {
        const objId = new ObjectId(eventId);
        await MongoConnection.get().updateData({ '_id': objId }, { $set: { 'eventCap': eventCap } }, MongoConnection.COLLECTION_E.Events);
    }

    /**
     * Returns if an event is full
     * 
     * @param {*} eventId id of event to check
     * @returns true if full, false otherwise
     */
    static async isFull(eventId) {
        const objId = new ObjectId(eventId);
        const event = await Event.getEventById(eventId);
        if (event.eventCap.joined >= event.eventCap.max) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Adds a user to an event
     * 
     * @param {*} username username of user to join to event 
     * @param {*} eventId event id of event to add user to
     * @returns response to send to client
     */
    static async joinEvent(username, eventId) {
        const eventExists = await Event.exists(eventId);
        const isFull = await Event.isFull(eventId);
        if (isFull) {
            //return Response.RESPONSE_E.EVENTFULL;
            return await Event.joinWaitlist(username, eventId);
        }
        if (eventExists) {
            let event = await Event.getEventById(eventId);
            
            if (event.joinedUsers == null) {
                event.joinedUsers = [ username ];
            } else {
                if (!event.joinedUsers.includes(username)) {
                    event.joinedUsers.push(username);
                }
            }
            await Event.updateJoined(eventId, event.joinedUsers);
            await Event.updateCap(eventId, new EventCap(event.joinedUsers.length, event.eventCap.max));
            EmailNotif.scheduleEventNotifTimer(event, username); 
            return Response.RESPONSE_E.JOINEDEVENT;
        } else {
            return Response.RESPONSE_E.NOSUCHEVENT;
        }
    }

    /**
     * Adds a user to the waitlist
     * 
     * @param {*} username username of user to add
     * @param {*} eventId event id of event to add to
     * @returns 
     */
    static async joinWaitlist(username, eventId) {
        const eventExists = await Event.exists(eventId);
        if (eventExists) {
            let event = await Event.getEventById(eventId);
            if (event.joinedUsers != null && event.joinedUsers.includes(username)) {
                return Response.RESPONSE_E.ALREADYJOINED; 
            }
            if (event.waitlistedUsers == null) {
                event.waitlistedUsers = [ username ];
            } else {
                if (!event.waitlistedUsers.includes(username)) {
                    event.waitlistedUsers.push(username);
                }
            }
            await Event.updateWaitlist(eventId, event.waitlistedUsers);
            return Response.RESPONSE_E.JOINEDWAITLIST;
        } else {
            return Response.RESPONSE_E.NOSUCHEVENT;
        }
    }    

    static async reorganizeWaitlist(eventId) {
        const eventExists = await Event.exists(eventId);
        if (eventExists) {
            let event = await Event.getEventById(eventId);
            let seatsLeft = event.eventCap.max - event.eventCap.joined;
            console.log(seatsLeft);
            if (event.waitlistedUsers != null) {
                let filledSeats = 0;
                for (let i = 0; i < event.waitlistedUsers.length && i < seatsLeft; i++) {
                    event.joinedUsers.push(event.waitlistedUsers[i]);
                    filledSeats++;
                    EmailNotif.scheduleEventNotifTimer(event, event.waitlistedUsers[i]);
                    console.log(event.waitlistedUsers);
                }
                event.waitlistedUsers = event.waitlistedUsers.splice(filledSeats);
            }
            try{
                event.eventCap.joined = event.joinedUsers.length;
            } catch(ex){
                console.log(ex);
            }
            await Event.updateJoined(eventId, event.joinedUsers);
            await Event.updateWaitlist(eventId, event.waitlistedUsers);
            await Event.updateCap(eventId, event.eventCap);
        }
    }

    /**
     * Removed a user from an event
     * 
     * @param {*} username username of person to remove 
     * @param {*} eventId id of event to remove from
     * @returns server response
     */
    static async leaveEvent(username, eventId) {
        const event = await Event.getEventById(eventId);
        const eventExists = await Event.exists(eventId);
        if (!eventExists) {
            return Response.RESPONSE_E.NOSUCHEVENT;
        }
        
        if (event.joinedUsers != null && event.joinedUsers.includes(username)) {
            const filteredEvents = event.joinedUsers.filter(x => { return (x != username) });
            event.joinedUsers = filteredEvents;
            await Event.updateJoined(eventId, event.joinedUsers);
            await Event.updateCap(eventId, new EventCap(event.joinedUsers.length, event.eventCap.max));
            EmailNotif.cancelEventNotifTimer(eventId, username);
            return Response.RESPONSE_E.LEFTEVENT;
        } 
        if (event.waitlistedUsers != null && event.waitlistedUsers.includes(username)) {
            const filteredEvents = event.waitlistedUsers.filter(x => { return (x != username) });
            event.waitlistedUsers = filteredEvents;
            await Event.updateWaitlist(eventId, event.waitlistedUsers);
            return Response.RESPONSE_E.LEFTWAITLIST;
        }
        return Response.RESPONSE_E.LEFTEVENT;
    }

    static async isUserInEvent(event, username) {
        const dbEvent = await MongoConnection.get().queryCollection({ _id: event._id }, MongoConnection.COLLECTION_E.Events);
        if (dbEvent.joinedUsers.includes(username)) {
            return true;
        } else {
            return false;
        }
    }
}

exports.Event = Event;