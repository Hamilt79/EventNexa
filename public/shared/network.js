class Network {
    static domainName = 'https://eventnexa.tech/';
    //static domainName = 'http://127.0.0.1:3000/';
    

    /**
     * Redirects the user to a url
     * 
     * @param {String} url url to redirect to
     */
    static redirect(url) {
        window.location.href = url;
        //console.log(url);
    }

    /**
     * Redirects the user to a local url from the domain
     * 
     * @param {String} url local url to redirect to 
     */
    static redirectLocal(url) {
        this.redirect(this.domainName + url);
    }

    /**
    * Redirects the user to registration page.
    */
    static goToRegistration() {
        Network.redirectLocal('registration/registration.html');
    }

    /**
     * Redirects user to login page
    */
    static goToLogin() {
        if (window.location.href.startsWith('file') == false) {
            Network.redirectLocal('login/login.html');
        }
    }

    /**
     * Redirects the user to profile page
     */
    static goProfile() {
        Network.redirectLocal('profile/profile.html');
    }

    /**
     * Redirects user to home page
     */
    static goHome() {
        Network.redirectLocal('');
    }

    /**
     * Redirects the user to profile page
     */
    static goToCreatedEvents() {
        Network.redirectLocal('createdevents/createdevents.html');
    }

    /**
     * 
     * @param {*} event event to send
     * @param {*} username username
     * @param {*} password pass
     * @param {*} callback callback to a function with one data paremeter
     */
    static createEvent(event, username, password, callback) {
        fetch(Network.domainName + 'createevent', 
		{ 	method: 'POST', 
			headers: 
				{	
					'username': username, 
					'password': password,
                    'event' : JSON.stringify(event)
				}
		}
	).then(function(response) { return response.text(); }).then(function(data) { callback(JSON.parse(data)) });
    }

    /**
     * Fetches events that match a filter and sort
     * 
     * @param {*} filter mongodb filter object
     * @param {*} sort mongodb sort object
     * @param {*} callback method to call once a response is gotten
     */
    static fetchEvents(filter, sort, callback) {
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
        ).then(function(response) { return response.text(); }).then(function(data) { callback(JSON.parse(data)) });
    }

    static fetchJoinedEvents() {
        fetch(Network.domainName + 'event/join',
        { 	method: 'POST', 
            headers: 
                {	
                    'username': UserUtils.getUsername(), 
                    'password': UserUtils.getPassword(),
                    'type': 'joined'
                } 
        }
        ).then(function(response) { return response.text(); }).then(function(data) { callback(JSON.parse(data)) });
    }

    /**
     * Join and event by it's id
     * 
     * @param {*} id event _id to join
     * @param {*} callback method called when server responds
     */
    static joinEvent(id, callback) {
        fetch(Network.domainName + 'event/join',
        { 	method: 'POST', 
            headers: 
                {	
                    'username': UserUtils.getUsername(), 
                    'password': UserUtils.getPassword(),
                    '_id': id
                } 
        }
        ).then(function(response) { return response.text(); }).then(function(data) { callback(JSON.parse(data)) });
    }

    /**
     * 
     * @param {*} id 
     * @param {*} callback 
     */
    static leaveEvent(id, callback) {
        fetch(Network.domainName + 'event/leave',
        { 	method: 'POST', 
            headers: 
                {	
                    'username': UserUtils.getUsername(), 
                    'password': UserUtils.getPassword(),
                    '_id': id
                } 
        }
        ).then(function(response) { return response.text(); }).then(function(data) { callback(JSON.parse(data)) });
    }

    /**
     * General method for getting the error response from server
     * 
     * @param {*} data data from server
     * @returns response message
     */
    static getResponse(data) {
        return data['Response'];
    }

}