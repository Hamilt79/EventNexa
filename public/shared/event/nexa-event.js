class NexaEvent {
    /**
     * Constructor for Event.
     * 
     * @param {String} title title of event
     * @param {String} description description of event
     * @param {String} author username of event creator
     * @param {EventCap} eventCap event cap
     * @param {DateTime} eventDate date event starts in UTC
     * @param {Address} address address of event
     */
    constructor(title, description, author, eventCap, eventDate, address) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.eventCap = eventCap;
        this.eventDate = eventDate;
        this.address = address;
    }
}
