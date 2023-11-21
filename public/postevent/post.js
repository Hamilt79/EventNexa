function postEvent() {
    const eventName = document.getElementById('eventName').value;
    const eventType = document.getElementById('eventType').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const eventTime = document.getElementById('eventTime').value;

    console.log('Event Name:', eventName);
    console.log('Event Type:', eventType);
    console.log('Event Location:', eventLocation);
    console.log('Event Time:', eventTime);

}

function sendCreateEventReq() {
    const username = UserUtils.getUsername();
	const password = UserUtils.getPassword();
    const title = document.getElementById('event-title');
    const description = document.getElementById('event-desc');
    const eventTime = document.getElementById('event-time');
    const eventCap = document.getElementById('event-cap');
    const street = document.getElementById('event-street');
    const city = document.getElementById('event-city');
    const state = document.getElementById('event-state');
    const zip = document.getElementById('event-zip');
    const address = new NexaAddress(city, state, zip, street);
    const capOb = new EventCap(0, eventCap);
    const dateTime = new Date(eventTime.value).toUTCString();
    const event = new NexaEvent(title, description, username, capOb, dateTime, address);

	fetch(Network.domainName + 'event/create', 
		{ 	method: 'POST', 
			headers: 
				{	
					'username': username, 
					'password': password,
                    'event': JSON.stringify(event)
				} 
		}
	).then(function(response) { return response.text(); }).then(function(data) { createEventResponse(JSON.parse(data)) });
}

function createEventResponse(data) {
    console.log(data);
}