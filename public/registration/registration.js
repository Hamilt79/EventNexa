/**
* Redirects the user to registration page.
*/
function goToRegistration() {
	Network.redirectLocal('registration/registration.html');
}

/**
 * Sends the request to register a user.
 */
function registerRequest() {
	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const passwordVerify = document.getElementById('passwordverify').value;

	if (password !== passwordVerify) {
		displayMessage("red", "Passwords do not match.");
		return;
	}

	fetch(Network.domainName + 'registration/createaccount', 
		{ 	method: 'POST', 
			headers: 
				{ 	'email': email, 
					'username': username, 
					'password': password 
				} 
		}
	).then(function(response) { return response.text(); }).then(function(data) { onRecieveRequest(data); });
}

/**
 * Method called when the registration request is sent back to the local
 * machine.
 * @param {*} data JSON formatted information from server
 */
function onRecieveRequest(data) {
	try {
	const response = JSON.parse(data);
	displayMessage("Red", response['Response']);
	} catch(ex) {
		console.log(ex);
	}
}
