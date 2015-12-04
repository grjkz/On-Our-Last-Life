$(function() {


	/**
	 
	 * Show series description if arrow is clicked
	 
	 */
	$('.mdi-menu-down').click(function(e) {
		var clicked = $(this);
		var index = clicked.data('target-index');
		var descriptionNode = $('[data-description='+index+']');
		
		if (clicked.hasClass('opened')) {
			// remove 'opened' class
			// rotate arrow back to initial state
			// hide description
			clicked.removeClass('opened');
			clicked.velocity({
				rotateZ: '0deg'
			}, {
				duration: 200
			});

			descriptionNode.velocity('slideUp', 200);
		} else {
			// add 'opened' class
			// rotate arrow 180 degrees
			// show description
			clicked.addClass('opened');
			clicked.velocity({
				rotateZ: '-180deg'
			}, {
				duration: 200
			});

			descriptionNode.velocity('slideDown', 200);
		}
});
});