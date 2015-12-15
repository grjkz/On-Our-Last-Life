console.log('admin.js linked');
$(function() {



});


/**
 
 * Flash global message
 * @param {string} message Test to show inside div
 * @param {string} fontColor Changes the CSS font color
 */

function globalMessage(message, fontColor) {
	var color = "";
	
	switch (fontColor) {
		case "success":
			color = '#00FF00';
			break;

		case "error":
			color = '#FF0000';
			break;

		case "failure":
			color = '#FA2A00';
			break;

		default:
			color = '#000000';
	}

	var global = $('#global-message');
	global.text(message)
		.velocity({ color: color }, 0)
		.velocity('fadeIn', 0)
		.velocity('fadeOut', {
			delay: 3000,
			duration: 500
		});
}
