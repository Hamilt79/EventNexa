function sendReq(button) {
	fetch('https://www.eventnexa.tech/test').then(function(response) { return response.text(); }).then(function(data) { button.value = data; });
}

function registerRequest(button) {
	fetch('https://www.eventnexa.tech/registration/createaccount', { method: 'POST', headers: { 'email': 'thisisemail@gmail.com', 'username': 'CoolUsername', 'password': 'VerySecurePassword' } }).then(function(response) { return response.text(); }).then(function(data) { button.value = data; });
}

function goProfile() {
	window.location.href = 'https://eventnexa.tech/profile/';
}