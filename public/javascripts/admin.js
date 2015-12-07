console.log('admin.js linked');
$(function() {



});


/**
 
 * Flash global message
 * @param  {string} message Test to show inside div
 
 */

function globalMessage(message) {
	$('#global-message').text(message);
	$('#global-message').velocity('fadeIn', 0)
											.velocity('fadeOut', {
												delay: 3000,
												duration: 500
											});
}
