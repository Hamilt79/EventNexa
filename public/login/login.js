/**
 * Sends a login request to server
 */
function loginRequest() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	fetch(Network.domainName + 'login/loginrequest', 
		{ 	method: 'POST', 
			headers: 
				{	
					'username': username, 
					'password': password 
				} 
		}
	).then(function(response) { return response.text(); }).then(function(data) { loginResponse(JSON.parse(data)) });
}

/**
 * Handles the response to the login request
 * @param {*} response JSON formatted response from server
 */
function loginResponse(response) {
	if (response['Response'] == 'True') {
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;
		Cookies.setCookie(Cookies.COOKIE_NAME_E.username, username, 5);
		Cookies.setCookie(Cookies.COOKIE_NAME_E.password, password, 5);
		displayMessage("Green", "Logged In!");
		Network.goHome();
	} else if (response['Response'] == 'False') {
		displayMessage("Red", "Wrong password or username");
	} else {
		displayMessage("Red", "Unknown Server Error");
	}
}
