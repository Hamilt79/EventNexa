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
	).then(function(response) { return response.text(); }).then(function(data) { console.log(JSON.parse(data)) });
}

window.onload = fetchEvents();