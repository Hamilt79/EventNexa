
class EventCloner {

    static lastCreationTime = null;

    /**
     * Removes all Events from screen
     */
    static deleteEvents() {
        document.getElementById('events-div').innerHTML = '';
    }

    /**
     * Makes an event from an Event object
     * 
     * @param {*} newEvent event to create
     */
    static makeEvent(newEvent, lowOpacity = false) {
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
        let id = event.querySelector('#event-id');

        let joinButton = event.querySelector('#join-event');

        if (joinButton != null && newEvent.joined != null && newEvent.waitlisted != null) {
            if (newEvent.joined == true) {
                joinButton.textContent = 'Leave Event';
                joinButton.onclick = function() { leaveEvent(joinButton); };
            }
            if (newEvent.waitlisted == true) {
                joinButton.textContent = 'Leave Waitlist';
                joinButton.onclick = function() { leaveEvent(joinButton) };
            }
            if (newEvent.eventCap.joined >= newEvent.eventCap.max && newEvent.joined == false && newEvent.waitlisted == false) {
                joinButton.textContent = 'Join Event';
                joinButton.onclick = function() { joinEvent(joinButton) };
            } 
        }

        if (lowOpacity) {
            event.style = 'opacity: 50%;';
            if (joinButton != null) {
                joinButton.disabled = true;
                joinButton.className = 'disabled';
            }
        } 

        title.textContent = newEvent.title;
        description.textContent = newEvent.description;
        author.textContent = newEvent.author;
        eventCap.textContent = newEvent.eventCap.joined + "/" + newEvent.eventCap.max;
        eventTime.textContent = new Date(newEvent.eventDate).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        address.textContent = newEvent.address.streetAddress + " " + newEvent.address.city  + " " + newEvent.address.state + " " + newEvent.address.zip;
        id.textContent = newEvent._id;
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