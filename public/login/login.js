function sendReq(button) {
	fetch('https://www.eventnexa.tech/test').then(function(response) { return response.text(); }).then(function(data) { button.value = data; });
}

function registerRequest() {
	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const passwordVerify = document.getElementById('passwordverify').value;

	fetch('https://www.eventnexa.tech/registration/createaccount', 
		{ 	method: 'POST', 
			headers: 
				{ 	'email': email, 
					'username': username, 
					'password': password 
				} 
		}
	).then(function(response) { return response.text(); }).then(function(data) { displayMessage('red', data) });
}

function displayMessage(color, message) {
	const textEl = document.getElementById('usermessagedisplay');
	textEl.innerHTML = message;
	textEl.style = 'text-align: center; color: ' + color + ';';
}

function goProfile() {
	window.location.href = 'https://eventnexa.tech/profile/';
}