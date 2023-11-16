class NexaEvent {
    /**
     * Constructor for NexaEvent.
     * 
     * @param {String} title title of event
     * @param {String} description description of event
     * @param {String} publisher username of event creator
     * @param {EventCap} eventCap event cap
     * @param {Date} eventDate date event starts
     * @param {*} id id event is stored as
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
