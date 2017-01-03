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
	$("#email-form-contact").submit(function(e) {
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

	// CSS animation on scroll

	$(window).scroll(function () {
	    $('[data-ix="fadeintop"]').each(function () {
				var bounds = $(this).get(0).getBoundingClientRect();

        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            $(this).addClass("anim_fadeintop");
        } else {
            $(this).removeClass("anim_fadeintop");
        }
			});
			$('[data-ix="fadeinscaleup"]').each(function () {
				var bounds = $(this).get(0).getBoundingClientRect();

        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            $(this).addClass("anim_fadeinscaleup");
        } else {
            $(this).removeClass("anim_fadeinscaleup");
        }
			});
			$('[data-ix="fadeindown"]').each(function () {
				var bounds = $(this).get(0).getBoundingClientRect();

        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            $(this).addClass("anim_fadeindown");
        } else {
            $(this).removeClass("anim_fadeindown");
        }
			});
	});

})
