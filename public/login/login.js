function loginRequest() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	fetch('https://www.eventnexa.tech/login/loginrequest', 
		{ 	method: 'POST', 
			headers: 
				{	
					'username': username, 
					'password': password 
				} 
		}
	).then(function(response) { return response.text(); }).then(function(data) { loginResponse(data) });
}

function loginResponse(response) {
	
}

function displayMessage(color, message) {
	const textEl = document.getElementById('usermessagedisplay');
	textEl.innerHTML = message;
	textEl.style = 'text-align: center; color: ' + color + ';';
}

function goToRegistration() {
	window.location.href = 'https://eventnexa.tech/registration/registration.html';
}