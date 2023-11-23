const { ObjectId } = require('mongodb');
const { MongoConnection } = require('../mongodb/mongodb'); 

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
     */
    constructor(title, description, author, eventCap, eventDate, milliTime, creationTime, address, joinedUsers) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.eventCap = eventCap;
        this.eventDate = eventDate;
        this.milliTime = milliTime;
        this.creationTime = creationTime;
        this.address = address;
        this.joinedUsers = joinedUsers;
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
        const event = Event.getEventById(eventId);
        if (event.eventCap.joined >= event.eventCap.max) {
            return true;
        } else {
            return false;
        }
    }

}

exports.Event = Event;