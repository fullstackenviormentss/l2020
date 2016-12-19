$(document).ready(function(){
	$("#email-form-newsletter").submit(function(e) {
	  e.preventDefault();

	  var $form = $(this);

	  var posting = $.post($form.attr("action"), $form.serialize())
 
	  // Put the results in a div
	  posting.done(function() {
	    $('.w-form-done').show()
	  });
	  posting.fail(function() {
	    $('.w-form-fail').show()
	  });

	});
})