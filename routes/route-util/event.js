class Event {
    /**
     * Constructor for Event.
     * 
     * @param {*} title title of event
     * @param {*} description description of event
     * @param {*} publisher username of event
     */
    constructor(title, description, publisher) {
        this.title = title;
        this.description = description;
        this.publisher = publisher;
    }

    /**
     * Gets the title of the event
     */
    get title() {
        return this.title;
    }
    
    /**
     * Gets the description of the event
     */
    get description() {
        return this.description;
    }

    /**
     * Gets the username of the publisher
     */
    get publisher() {
        return this.publisher;
    }
}

exports.Event = Event;