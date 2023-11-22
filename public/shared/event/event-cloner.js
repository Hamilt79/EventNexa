
class EventCloner {

    /**
     * Makes an event from an Event object
     * 
     * @param {*} newEvent event to create
     */
    static makeEvent(newEvent) {
        const eventToClone = document.getElementById('event-clone');
        let event = eventToClone.cloneNode(true);
        eventToClone.parentElement.appendChild(event);
        event.style = "";
        let title = event.querySelector('#event-title')
        let description = event.querySelector('#event-description')
        let author = event.querySelector('#event-author')
        let eventCap = event.querySelector('#event-cap')
        let eventTime = event.querySelector('#event-time')
        let address = event.querySelector('#event-address')

        title.textContent = newEvent.title;
        description.textContent = newEvent.description;
        author.textContent = newEvent.author;
        eventCap.textContent = newEvent.eventCap.joined + "/" + newEvent.eventCap.max;
        eventTime.textContent = new Date(newEvent.eventDate).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })

        address.textContent = newEvent.address.streetAddress + " " + newEvent.address.city  + " " + newEvent.address.state + " " + newEvent.address.zip;
    }

    /**
     * Makes events from an array of Event objects
     * 
     * @param {*} arrayOfEvents array of events to make
     */
    static makeEventsFromArr(arrayOfEvents) {
        for(let i = 0; i < arrayOfEvents.length; i++) {
            EventCloner.makeEvent(arrayOfEvents[i]);
        }
    }
}