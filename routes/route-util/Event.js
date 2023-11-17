class Event {
    /**
     * Constructor for Event.
     * 
     * @param {String} title title of event
     * @param {String} description description of event
     * @param {String} publisher username of event creator
     * @param {EventCap} eventCap event cap
     * @param {DateTime} eventDate date event starts
     * @param {String} address address of event
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