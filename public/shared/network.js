class Network {
    static domainName = 'https://eventnexa.tech/';
    //static domainName = 'http://192.168.65.26:3000/';

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
        Network.redirectLocal('login/login.html');
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
                    'event' : event
				} 
		}
	).then(function(response) { return response.text(); }).then(function(data) { callback(JSON.parse(data)) });
    }

}