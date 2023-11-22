

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
    const title = document.getElementById('event-title').value;
    const description = document.getElementById('event-desc').value;
    const eventTime = document.getElementById('event-time').value;
    const eventCap = document.getElementById('event-cap').value;
    const street = document.getElementById('event-street').value;
    const city = document.getElementById('event-city').value;
    const state = document.getElementById('event-state').value;
    const zip = document.getElementById('event-zip').value;
    const address = new NexaAddress(city, state, zip, street);
    const capOb = new EventCap(0, eventCap);
    const dateTime = new Date(eventTime).toUTCString();
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
    const response = Network.getResponse(data);
    if (response == NexaResponse.RESPONSE_E.BADLOGIN) {
        Network.goToLogin();
    } else if (response == NexaResponse.RESPONSE_E.EVENTCREATED) {
        Network.goToCreatedEvents();
    } else {
        alert('Server Error, Please ensure everything is filled out');
    }
    console.log(data);
}