class Event {
    /**
     * Constructor for Event.
     * 
     * @param {String} title title of event
     * @param {String} description description of event
     * @param {String} publisher username of event creator
     * @param {EventCap} eventCap event cap
     * @param {Date} eventDate date event starts
     */
    constructor(title, description, publisher, eventCap, eventDate) {
        this.title = title;
        this.description = description;
        this.publisher = publisher;
        this.eventCap = eventCap;
        this.eventDate = eventDate;
    }
}

exports.Event = Event;