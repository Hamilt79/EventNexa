/**
 * Function called when the webpage loads in
 */
function onLoad() {
	console.log("Loaded");
	loginCheck();
}

/**
 * Checks if the user has login credentials stored in cookies
 */
function loginCheck() {
	if (getCookie("token") == "") {
		console.log("Token does not exist");
		Network.redirectLocal('registration/registration.html');
		//setCookie("token", "usertoken", 5);
	} else {
		console.log("Token is: " + getCookie("token"));
	}
}

window.onload = onLoad;