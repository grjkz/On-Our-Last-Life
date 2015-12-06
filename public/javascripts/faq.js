console.log('faq.js linked')
$(function() {

	/**
	 * Smooth Scroll to Question and flash
	 */
	$('.question-list a').click(function(e) {
		e.preventDefault();

		// get index number of parent (li) of clicked item
		var targetIndex = $(this).parent().index();
		// get respective target index of clicked item
		var targetNode = $( $('.faq li').get(targetIndex) );
		
		targetNode.velocity('scroll', {
			duration: 200,
		});
		targetNode.velocity({backgroundColor: "#AAAAAA"}, 0)
								.velocity('reverse', 200);

	});

	/**
	 * Scroll to top when #to-top-button is clicked
	 */
	
	$('#to-top-button').click(function() {
		$('body').velocity('scroll', 200);
	});


});