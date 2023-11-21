function fetchEvents() {
    const filter = {  };
    const sort = { _id: -1 };
    fetch(Network.domainName + 'event/get',
		{ 	method: 'POST', 
			headers: 
				{	
					'username': UserUtils.getUsername(), 
					'password': UserUtils.getPassword(),
                    'filter': JSON.stringify(filter),
                    'sort': JSON.stringify(sort) 
				} 
		}
	).then(function(response) { return response.text(); }).then(function(data) { onRecieveEvents(JSON.parse(data)) });
}

function onRecieveEvents(data) {
    const events = JSON.parse(data);
    for (let i = 0; i < events.length; i++) {
        EventCloner.makeEvent(events[i]);
    }
}

window.addEventListener('load', function() { fetchEvents(); });