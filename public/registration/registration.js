function sendReq(button) {
	fetch('https://www.eventnexa.tech/test').then(function(response) { return response.text(); }).then(function(data) { button.value = data; });
}

function registerRequest() {
	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const passwordVerify = document.getElementById('passwordverify').value;

	if (password !== passwordVerify) {
		displayMessage("red", "Passwords do not match.");
		return;
	}

	fetch('https://www.eventnexa.tech/registration/createaccount', 
		{ 	method: 'POST', 
			headers: 
				{ 	'email': email, 
					'username': username, 
					'password': password 
				} 
		}
	).then(function(response) { return response.text(); }).then(function(data) { onRecieveRequest(data); });
}

function onRecieveRequest(data) {
	try {
	const response = JSON.parse(data);
	if (displayMessage("Red", response['Error']));
	} catch(ex) {
		console.log(ex);
	}
}

function displayMessage(color, message) {
	const textEl = document.getElementById('usermessagedisplay');
	textEl.innerHTML = message;
	textEl.style = 'text-align: center; color: ' + color + ';';
}

function goToLogin() {
	window.location.href = "https://eventnexa.tech/login/login.html";
}

