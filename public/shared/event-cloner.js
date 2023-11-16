class EventCloner {
    static makeEvent() {
        const eventToClone = document.getElementById('event-clone');
        let event = eventToClone.cloneNode(true);
        eventToClone.parentElement.appendChild(event);
       
        event.style = "";
    }
}

EventCloner.makeEvent();