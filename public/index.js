function sendReq(button) {
	
	button.value = "Sent";
	fetch('https://www.pentacle.store/test', { mode: "no-cors" }).then(function(data){ console.log(data.text()); });
	
}