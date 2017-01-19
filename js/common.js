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

	mapManagement.init()

})

var mapManagement = {
	map: "",
	init: function() {
	  mapManagement.map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 46.8127598, lng: 7.999},
	    zoom: 6
	  });
	  mapManagement.placeMarker()
	},
	placeMarker: function(){
		var lang = "en"
		if(window.location.href.indexOf("/fr/") > -1) {
       lang = "fr"
    }
    if(window.location.href.indexOf("/de/") > -1) {
       lang = "de"
    }
		$.getJSON( "mapdata/venues.json", function( data ) {
		  $.each( data, function( key, val ) {
		  	var myLatLng = {lat: val.lat, lng: val.lng};
			  var marker = new google.maps.Marker({
			    position: myLatLng,
			    map: mapManagement.map,
			    title: 'Hello World!'
			  });
			  var title = "<h1>"+val.title_en+"</h1>"
			  if(lang == "fr"){
			  	var title = "<h1>"+val.title+"</h1>"
			  }
		    var infowindow = new google.maps.InfoWindow({
			    content: title
			  });
			  marker.addListener('click', function() {
		    	infowindow.open(mapManagement.map, marker);
		  	});
		  });
		});
	}
}