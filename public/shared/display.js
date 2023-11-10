/**
 * Displays a message in whatever color specified at the top of the page.
 * 
 * @param {String} color css color of text to display
 * @param {String} message text to display 
 */
function displayMessage(color, message) {
	const textEl = document.getElementById('usermessagedisplay');
	textEl.innerHTML = message;
	textEl.style = 'text-align: center; color: ' + color + ';';
}