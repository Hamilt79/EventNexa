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
	).then(function(response) { return response.text(); }).then(function(data) { loginResponse(data) });
}

/**
 * Handles the response to the login request
 * @param {*} response JSON formatted response from server
 */
function loginResponse(response) {
	
}

/**
 * Redirects user to login page
 */
function goToLogin() {
	Network.redirectLocal('login/login.html');
}