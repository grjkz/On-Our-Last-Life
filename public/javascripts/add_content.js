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


	/**
	 
	 * Series AJAX POST
	 
	 */

	$('#add-series-form').submit(function() {
		$('#add-series-form *').removeClass('error');

		var series = {
			name: $('#series-name').val().trim(),
			description: $('#series-description').val().trim()
		};

		// do nothing if mandatory field is empty
		if (!series.name) {
			$('#series-name').addClass('error');
			return false;
		}

		// do nothing if exact series name already exists
		if (checkDuplicateSeries(series.name)) {
			globalMessage("This Series already exists!");
			$('#series-name').addClass('error');
			return false;
		}

		$.ajax({
			type: "POST",
			url: "/api/series",
			data: series,
			success: function(data) {
				if (data.error) {
					globalMessage(data.error);
					return false;
				}
				// give success feedback message
				globalMessage(series.name + " Added!");

				// append the new option to #ep-series
				$('#ep-series').append('<option value='+ data.insertId +'>' + series.name + '</option>');
			},
			error: function() {
				globalMessage("Something went wrong. Try again later");
			}
		});

		return false;
	});


	/**
	 
	 * Episode AJAX POST
	 
	 */

	$('#add-episode-form').submit(function() {
		// clear all errored fields
		$('#add-episode-form *').removeClass('error');
		
		var episode = {
			series_id: parseInt( $('#ep-series').val() ),
			episode: $('#ep-num').val().trim(),
			title: $('#ep-title').val().trim(),
			description: $('#ep-description').val().trim(),
			href: $('#ep-href').val().trim(),
			embed: $('#ep-embed').val().trim()
		};

		// don't submit if title field is empty
		if (!episode.title) {
			$('#ep-title').addClass('error');
			return false;
		}

		$.ajax({
			type: "POST",
			url: "/api/episodes",
			data: episode,
			success: function(data) {
				if (data.error) {
					globalMessage(data.error);
					return false;
				}
				// give success feedback message
				globalMessage(episode.title + " Added!");
			},
			error: function() {
				globalMessage("Something went wrong. Try again later");
			}
		});

		return false;
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