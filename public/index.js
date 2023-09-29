function sendReq(button) {
	
	//fetch('https://www.pentacle.store/test').then(response => response.text()).then(data => console.log(data));
	fetch('https://www.eventnexa.tech/test').then(function(response) { return response.text(); }).then(function(data) { button.value = data; });

}

function goProfile() {
	window.location.href = 'https://eventnexa.tech/profile/';
}