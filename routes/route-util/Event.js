class Event {
    /**
     * Constructor for Event.
     * 
     * @param {String} title title of event
     * @param {String} description description of event
     * @param {String} author username of event creator
     * @param {EventCap} eventCap event cap
     * @param {DateTime} eventDate date event starts in UTC
     * @param {Number} miliTime eventDate.getTime() value
     * @param {Address} address address of event
     */
    constructor(title, description, author, eventCap, eventDate, miliTime, address) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.eventCap = eventCap;
        this.eventDate = eventDate;
        this.address = address;
    }

    /**
     * Checks if an event exists by its id
     * 
     * @param {*} eventId id of event
     */
    static async exists(eventId) {
        const eventExists = await MongoConnection.get().queryExists({ '_id': eventId }, MongoConnection.COLLECTION_E.Events);
        return eventExists;
    }
}

exports.Event = Event;