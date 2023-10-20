function sendReq(button) {
	
	//fetch('https://www.pentacle.store/test').then(response => response.text()).then(data => console.log(data));
	fetch('https://www.eventnexa.tech/test').then(function(response) { return response.text(); }).then(function(data) { button.value = data; });

}

function goProfile() {
	window.location.href = 'https://eventnexa.tech/profile/profile.html';
}

function onLoad() {
	console.log("Loaded");
	if (getCookie("token") == "") {
		console.log("Token does not exist");
		setCookie("token", "usertoken", 5);
	} else {
		console.log("Token is: " + getCookie("token"));
	}
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }






window.onload = onLoad;