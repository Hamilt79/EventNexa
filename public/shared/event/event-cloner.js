
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

        const cap = new EventCap(5, 10);
        const nexaAddress = new Address("TestCity", "Ohio", 45121, "5568 Shleer Road");
        const date = new Date.UTC(Date.now());

        const nexaEvent = new NexaEvent(title.textContent, description.textContent, author.textContent, cap, date, nexaAddress)

        Network.createEvent(nexaEvent, UserUtils.getUsername(), UserUtils.getPassword());
    }
}

EventCloner.makeEvent();