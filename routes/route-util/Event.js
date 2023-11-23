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

    static async getEventById(eventId) {
        const objID = new ObjectId(eventId);
        return await MongoConnection.get().queryCollection({ '_id': objID }, MongoConnection.COLLECTION_E.Events);
    }

    static async updateJoined(eventId, joinedUsers) {
        const objId = new ObjectId(eventId);
        await MongoConnection.get().updateData({ '_id': objId }, { $set: { 'joinedUsers': joinedUsers }}, MongoConnection.COLLECTION_E.Events );
    }

    static async updateCap(eventId, eventCap) {
        const objId = new ObjectId(eventId);
        await MongoConnection.get().updateData({ '_id': objId }, { $set: { 'eventCap': eventCap } }, MongoConnection.COLLECTION_E.Events);
    }

}

exports.Event = Event;