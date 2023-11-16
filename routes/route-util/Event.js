class Event {
    /**
     * Constructor for Event.
     * 
     * @param {String} title title of event
     * @param {String} description description of event
     * @param {String} publisher username of event creator
     * @param {EventCap} eventCap event cap
     * @param {Date} eventDate date event starts
     * @param {*} id eventId
     */
    constructor(title, description, publisher, eventCap, eventDate, id) {
        this.title = title;
        this.description = description;
        this.publisher = publisher;
        this.eventCap = eventCap;
        this.eventDate = eventDate;
        this.id = id;
    }
}

exports.Event = Event;