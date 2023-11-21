
class EventCloner {

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
        description.value = newEvent.description;
        author.textContent = newEvent.author;
        eventCap.textContent = newEvent.eventCap.joined + "/" + newEvent.eventCap.max;
        //eventTime.textContent = new Date(newEvent.eventDate).toLocaleDateString("YYYY-MM-DDTHH:mm.sssZ", { hour12: true })
        eventTime.textContent = new Date(newEvent.eventDate).toLocaleString([], { hour: '2-digit', hour12: true, minute: '2-digit', day: true })

        address.textContent = newEvent.address.streetAddress + " " + newEvent.address.city  + " " + newEvent.address.state + " " + newEvent.address.zip;
    }
}