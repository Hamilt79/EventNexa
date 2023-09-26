function sendReq(button) {
	
	button.value = "Sent";
	fetch('https://www.pentacle.store/test').then(response => response.text()).then(data => console.log(data));
	
}