console.log('admin.js linked');
$(function() {

	/**
	 
	 * Makes mandatory empty fields red on focusout
	 
	 */

	$('.mandatory-field').focusout(function() {
		if ( !$(this).val().trim() ) {
			$(this).addClass('error');
		}
		else {
			$(this).removeClass('error');
		}
	});


	/**
	 
	 * Checks new series name value for duplicate
	 
	 */
	
	 $('.db-unique').focusout(function() {
	 	if (checkDuplicateSeries( this.value.trim() )) {
	 		$(this).addClass('error');
	 	}
	 });


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


/**
 * Check for duplicate Series Name in #ep-series > option tags
 * @param  {string} name Series Name to check against
 * @return {bool}        true if duplicate exists
 */
function checkDuplicateSeries(name) {
	var duped = false;

	$('#ep-series > option').each(function(index, item) {
		if (item.text === name) { dupped = true; }
	});

	return duped;
}