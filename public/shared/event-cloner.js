class EventCloner {

    
    static makeEvent() {
        const eventToClone = document.getElementById('event-clone');
        let event = eventToClone.cloneNode(true);
        eventToClone.parentElement.appendChild(event);
        event.style = "";
        const title = event.querySelector('#event-title')
        const description = event.querySelector('#event-description')
        const author = event.querySelector('#event-author')
        const eventCap = event.querySelector('#event-cap')
        const eventTime = event.querySelector('#event-time')
        const address = event.querySelector('#event-address')

        console.log(title);
        console.log(description);
        console.log(author);
        console.log(eventCap);
        console.log(eventTime);
        console.log(address);

    }
}

EventCloner.makeEvent();