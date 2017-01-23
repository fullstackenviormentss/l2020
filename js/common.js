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
	  mapManagement.map.setOptions({styles: style});
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

var style = [{
	"elementType": "geometry",
	"stylers": [{
		"color": "#ffffff"
	}]
}, {
	"elementType": "labels.icon",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"elementType": "labels.text.fill",
	"stylers": [{
		"color": "#616161"
	}]
}, {
	"elementType": "labels.text.stroke",
	"stylers": [{
		"color": "#f5f5f5"
	}]
}, {
	"featureType": "administrative",
	"elementType": "labels",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "administrative.country",
	"stylers": [{
		"color": "#f5c900"
	}, {
		"visibility": "on"
	}]
}, {
	"featureType": "administrative.country",
	"elementType": "geometry",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "administrative.country",
	"elementType": "geometry.fill",
	"stylers": [{
		"color": "#f5c900"
	}]
}, {
	"featureType": "administrative.country",
	"elementType": "geometry.stroke",
	"stylers": [{
		"color": "#ce0071"
	}, {
		"visibility": "on"
	}, {
		"weight": 5.5
	}]
}, {
	"featureType": "administrative.country",
	"elementType": "labels",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "landscape.natural.terrain",
	"elementType": "geometry.fill",
	"stylers": [{
		"color": "#8080c0"
	}, {
		"lightness": 30
	}, {
		"visibility": "on"
	}]
}, {
	"featureType": "poi",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "poi",
	"elementType": "geometry",
	"stylers": [{
		"color": "#eeeeee"
	}]
}, {
	"featureType": "poi",
	"elementType": "labels.text.fill",
	"stylers": [{
		"color": "#757575"
	}]
}, {
	"featureType": "poi.park",
	"elementType": "geometry",
	"stylers": [{
		"color": "#e5e5e5"
	}]
}, {
	"featureType": "poi.park",
	"elementType": "labels.text.fill",
	"stylers": [{
		"color": "#9e9e9e"
	}]
}, {
	"featureType": "road",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "road",
	"elementType": "geometry",
	"stylers": [{
		"color": "#ffffff"
	}]
}, {
	"featureType": "road.arterial",
	"elementType": "labels.text.fill",
	"stylers": [{
		"color": "#757575"
	}]
}, {
	"featureType": "road.highway",
	"elementType": "labels.text.fill",
	"stylers": [{
		"color": "#616161"
	}]
}, {
	"featureType": "road.local",
	"elementType": "labels.text.fill",
	"stylers": [{
		"color": "#9e9e9e"
	}]
}, {
	"featureType": "transit.line",
	"elementType": "geometry",
	"stylers": [{
		"color": "#e5e5e5"
	}]
}, {
	"featureType": "transit.station",
	"elementType": "geometry",
	"stylers": [{
		"color": "#eeeeee"
	}]
}, {
	"featureType": "water",
	"elementType": "geometry.fill",
	"stylers": [{
		"color": "#0087cd"
	}, {
		"visibility": "on"
	}, {
		"weight": 3.5
	}]
}, {
	"featureType": "water",
	"elementType": "geometry.stroke",
	"stylers": [{
		"color": "#0087cd"
	}, {
		"visibility": "on"
	}, {
		"weight": 3
	}]
}, {
	"featureType": "water",
	"elementType": "labels.text.fill",
	"stylers": [{
		"color": "#ffffff"
	}]
}]