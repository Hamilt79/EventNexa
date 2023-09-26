function sendReq(button) {
	
	button.value = "Sent";
	fetch('https://www.pentacle.store/test').then(function(data){ console.log(data); });
	
}