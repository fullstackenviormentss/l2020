$(document).ready(function () {

  pageAjaxLoad();

  /* ===========================================
   Menu link hover line slider
   =========================================== */

  $(".nav_link")
    .mouseenter(function () {
      $(".nav_link.w--current").removeClass('w--current').addClass('w--page-current');
      $(this).addClass('w--current');
    })
    .mouseleave(function () {
      $(".nav_link.w--current").removeClass('w--current');
      $(".nav_link.w--page-current").removeClass('w--page-current').addClass('w--current');
    });

  /* ===========================================
   Change time format
   =========================================== */

  moment().format();
  // Get the language in html attribute lang=
  moment.locale($('html')[0].lang);
  // Change the date for every element time in Social_wall div
  $('.social_wall').find('time').each(function (i) {
    $(this).text(moment($(this).html()).fromNow());
  });


  /* ===========================================
   Global ajax transition page function
   =========================================== */


  var $page = $('#main'),
    options = {
      debug: true,
      cacheLength: 4,
      onStart: {
        duration: 350, // Duration of our animation
        render: function ($container) {
          // Add your CSS animation reversing class
          $container.addClass('is-exiting');
          // Restart your animation
          smoothState.restartCSSAnimations();
        }
      },
      onReady: {
        duration: 0,
        render: function ($container, $newContent) {
          // Remove your CSS animation reversing class
          $container.removeClass('is-exiting');
          // Inject the new content
          $container.html($newContent);
        }
      },
      onAfter: function ($container, $newContent) {
        pageAjaxLoad();
      }
    },
    smoothState = $page.smoothState(options).data('smoothState');


  /* ===========================================
   Newsletter form
   =========================================== */


  $("#email-form-newsletter").submit(function (e) {
    e.preventDefault();

    var $form = $(this);

    var posting = $.post($form.attr("action"), $form.serialize())

    // Put the results in a div
    posting.done(function () {
      $('.w-form-done').show()
    });
    posting.fail(function () {
      $('.w-form-fail').show()
    });

  });
  $("#email-form-contact").submit(function (e) {
    e.preventDefault();

    var $form = $(this);

    var posting = $.post($form.attr("action"), $form.serialize())

    // Put the results in a div
    posting.done(function () {
      $('.w-form-done').show()
    });
    posting.fail(function () {
      $('.w-form-fail').show()
    });

  });

  /* ===========================================
   CSS animation on scroll
   =========================================== */

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

function pageAjaxLoad() {

  // Randomize title at startup
  random_number = 1 + Math.floor(Math.random() * 3);
  $('.the_claim').removeClass('w--current');
  $('.the_claim:nth-of-type(' + random_number + ')').addClass('w--current');

  // Social_wall
  truncate_desc('.desc');

  // Truncate quoted status and shared story

  $(window).resize(function () {
    truncate_desc('.desc');
  });

  // Init Map

  if ($("#map").length) {
    mapManagement.init()
  }

  // Init Scroll Effect

  scrollEffects.init()

  // Polyfill init
  objectFitImages();

}

function truncate_desc(el) {
  $(el).each(function (i, obj) {
    $el = $(this);
    $wrap_story = $el.parent();
    height_available = $wrap_story.outerHeight(true)
    $ps = $wrap_story.children("*:not(.desc)");

    // measure how tall inside should be by adding together
    $ps.each(function () {
      height_available -= $(this).outerHeight(true);
    });

    $el.css('height', height_available)

    $el.dotdotdot()

  });
}


var scrollEffects = {
  win: $(window),
  slideInMods: $(".come-in-module"),
  fadeInMods: $(".fade-in-module"),
  init: function () {
    //Add class for social wall elements
    $('.social_wall .container>div').each(function (i, el) {
      var el = $(el);
      scrollEffects.slideInMods = scrollEffects.slideInMods.add(el)
    })
    //Merge all selectors
    var modules = scrollEffects.slideInMods.add(scrollEffects.fadeInMods)
    modules.each(function (i, el) {
      var el = $(el);
      //If element is already visible we will not apply any effect
      if (el.visible(true)) {
        el.addClass("already-visible");
      }
    });
    scrollEffects.win.scroll(function () {
      scrollEffects.slideIn()
      scrollEffects.fadeIn()
    })
  },
  slideIn: function () {
    scrollEffects.slideInMods.each(function (i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("come-in");
      }
    });
  },
  fadeIn: function () {
    scrollEffects.fadeInMods.each(function (i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("fade-in");
      }
    });
  }
}

/* ===========================================
   Google map
   =========================================== */

var mapManagement = {
  map: "",
  init: function () {
    mapManagement.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 46.8127598,
        lng: 7.999
      },
      zoom: 6,
      scrollwheel: false
    });
    mapManagement.placeMarker()
    mapManagement.map.setOptions({
      styles: style
    });
  },
  placeMarker: function () {
    var lang = "en"
    if (window.location.href.indexOf("/fr/") > -1) {
      lang = "fr"
    }
    if (window.location.href.indexOf("/de/") > -1) {
      lang = "de"
    }
    $.getJSON("mapdata/venues.json", function (data) {
      $.each(data, function (key, val) {
        var myLatLng = {
          lat: val.lat,
          lng: val.lng
        };
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: mapManagement.map,
          icon: '../images/location_v2.png',
          title: 'Hello World!'
        });
        var content = "<h1>" + val.title_en + "</h1><p>" + val.texte_en + "</p><p><a href=" + val.lienEn + " target='_blank'>More</a></p>"
        if (lang == "fr") {
          var content = "<h1>" + val.title + "</h1><p>" + val.texte_fr + "</p><p><a href=" + val.link + " target='_blank'>En savoir plus</a></p>"
        }
        if (lang == "de") {
          var content = "<h1>" + val.title_de + "</h1><p>" + val.texte_de + "</p><p><a href=" + val.lienDe + " target='_blank'>Mehr infos</a></p>"
        }
        var infowindow = new google.maps.InfoWindow({
          content: content
        });
        marker.addListener('click', function () {
          infowindow.open(mapManagement.map, marker);
        });
      });
    });
  }
}

var style = [{
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#616161"
    }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#f5f5f5"
    }]
  },
  {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [{
      "visibility": "simplified"
    }]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#f5c900"
    }]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#ce0071"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 2
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text",
    "stylers": [{
      "color": "#ce0071"
    }]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#ce0071"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#ffffff"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#0087eb"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#ffffff"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "poi",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "color": "#eeeeee"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#757575"
    }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e5e5e5"
    }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9e9e9e"
    }]
  },
  {
    "featureType": "road",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "color": "#ffffff"
    }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#757575"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "color": "#ffffff"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#616161"
    }]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9e9e9e"
    }]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e5e5e5"
    }]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{
      "color": "#eeeeee"
    }]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#0087cd"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 3.5
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#0087cd"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 3
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#ffffff"
    }]
  }
]