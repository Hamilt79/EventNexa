function sendReq(button) {
	
	//fetch('https://www.pentacle.store/test').then(response => response.text()).then(data => console.log(data));
	fetch('https://www.pentacle.store/test').then(function(response) { return response.text(); }).then(function(data) { button.value = data; });

}