class Event {
    constructor(title, description, publisher) {
        this.title = title;
        this.description = description;
        this.publisher = publisher;
    }

    get title() {
        return this.title;
    }

    get description() {
        return this.description;
    }

    get publisher() {
        return this.publisher;
    }
}

exports.Event = Event;