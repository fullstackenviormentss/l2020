$(document).ready(function () {

  polyfill.initGlobal();
  titleSlider.init();
  scrollEffects.init();

  navHover.init();

  flipIcons.init();

  video.FSbackgroundChange();
  video.hoverControls();

  // Google Map
  if ($("#map").length) {
    mapManagement.init();
  }

  truncateText.init(".new", ".news_date");
  truncateText.init(".status", "");
  truncateText.init(".wrap_item blockquote", "");

  jQuery.timeago.settings.strings = localeTimeAgo[$("html").attr("lang")];
  jQuery("time").timeago();

  formManagement.init("#email-form-newsletter");
  formManagement.init("#email-form-contact");

});

var polyfill = {
  // Function which listen to added elements and are initiated only one time
  initGlobal: function () {
    // Objectfit
    if (!Modernizr.objectfit) {
      $.getScript('./js/vendors/polyfill/ofi.min.js')
        .done(function () {
          objectFitImages(null, {
            watchMQ: true
          });
        })
        .fail(function () {
          console.log('Ofi polyfill failed to load');
        });

    }
    // Flexbox
    if (!Modernizr.flexbox || !Modernizr.flexwrap) {
      $.getScript('./js/vendors/polyfill/flexibility.js')
        .done(function () {
          console.log("flexibility loaded");
          $('.newsletter, .newsletter form, .about-content').attr("data-style", "display: flex;");
          $('.newsletter, .newsletter form, .about-content').css("-js-display", "flex");
          flexibility(document.documentElement);
        })
        .fail(function () {
          console.log('Flexibility polyfill failed to load');
        });
    }
    // Vmin, vw ...vh
    if (!Modernizr.cssvminunit || !Modernizr.cssvwunit) {
      $.getScript('./js/vendors/polyfill/vminpoly.js')
        .fail(function () {
          console.log('Vmin polyfill failed to load');
        });
    }
  }
};

/* ===========================================
   Flip icons sport
   =========================================== */

var flipIcons = {
  init: function () {
    $('.pictos-grp')
      .mouseenter(function () {
        $(this).find('img').removeClass();
        $(this).find('img').addClass('flip-in');
      })
      .mouseleave(function () {
        $(this).find('img').addClass('flip-out');
      });
  }
};


/* ===========================================
   Hide show socials icons on header
   =========================================== */

var headerSocialsManager = {
  init: function () {
    $(window).scroll(function () {
      if ($(window).scrollTop() > 5) {
        if ($(".socials").hasClass("slidedown")) {
          $(".socials").removeClass("slidedown").addClass("slideup");
        }
      }
      if ($(window).scrollTop() < 5) {
        if ($(".socials").hasClass("slideup")) {
          $(".socials").removeClass("slideup").addClass("slidedown");
        }
      }
    })
  }
};

var scrollEffects = {
  slideInMods: $(".come-in-module"),
  fadeInMods: $(".fade-in-module"),
  init: function () {
    //Add class for social wall elements
    $('.social_wall .container>div').each(function (i, el) {
      var el = $(el);
      scrollEffects.slideInMods = scrollEffects.slideInMods.add(el);
    });
    //Merge all selectors
    var modules = scrollEffects.slideInMods.add(scrollEffects.fadeInMods);

    modules.each(function (i, el) {
      scrollEffects.set(el, "already-visible");
    });
    $(window).scroll(function () {
      scrollEffects.slideIn();
      scrollEffects.fadeIn();
    });

    /* ===========================================
    About Page numbers
    =========================================== */

    $(window).scroll(function () {
      $('[data-ix="fadeintop"]').each(function () {
        var bounds = $(this).get(0).getBoundingClientRect();

        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          $(this).addClass("fade-in-top");
        } else {
          $(this).removeClass("fade-in-to");
        }
      });
      $('[data-ix="fadeinscaleup"]').each(function () {
        var bounds = $(this).get(0).getBoundingClientRect();

        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          $(this).addClass("fade-in-scale-up");
        } else {
          $(this).removeClass("fade-in-scale-up");
        }
      });
      $('[data-ix="fadeindown"]').each(function () {
        var bounds = $(this).get(0).getBoundingClientRect();

        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          $(this).addClass("fade-in-down");
        } else {
          $(this).removeClass("fade-in-down");
        }
      });
    });
  },
  slideIn: function () {
    scrollEffects.slideInMods.each(function (i, el) {
      scrollEffects.set(el, "come-in");
    });
  },
  fadeIn: function () {
    scrollEffects.fadeInMods.each(function (i, el) {
      scrollEffects.set(el, "fade-in");
    });
  },
  set: function (el, elClass) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass(elClass);
    }
  },
  clear: function () {
    $(".already-visible").removeClass("already-visible");
    $(".fade-in-module.fade-in").removeClass("fade-in");
    $(".come-in-module.come-in").removeClass("come-in");
  }
};


/* ===========================================
Nav link hover line slider
=========================================== */

var navHover = {
  init: function () {
    $(".nav_link")
      .mouseenter(function () {
        $(".nav_link.w--current").removeClass('w--current').addClass('w--page-current');
        $(this).addClass('w--current');
      })
      .mouseleave(function () {
        $(".nav_link.w--current").removeClass('w--current');
        $(".nav_link.w--page-current").removeClass('w--page-current').addClass('w--current');
      });
  }
};

/* ===========================================
 Title Slider
 =========================================== */


var titleSlider = {
  slider: null,
  el: '.the_claim',
  elAddClass: 'fade-in',
  elRemoveClass: 'fade-out',
  init: function () {
    random_number = 1 + Math.floor(Math.random() * $(titleSlider.el).length);
    $(titleSlider.el + ':nth-of-type(' + random_number + ')').addClass(titleSlider.elAddClass);
    titleSlider.start();
  },
  start: function () {
    this.slider = window.setInterval(function () {
      var $next = $(titleSlider.el + '.' + titleSlider.elAddClass)
        .removeClass(titleSlider.elAddClass)
        .addClass(titleSlider.elRemoveClass)
        .next(titleSlider.el);

      // if not the last one
      if ($next.length) {
        $next.removeClass(titleSlider.elRemoveClass).addClass(titleSlider.elAddClass);
      } else {
        $(titleSlider.el + ":first").removeClass(titleSlider.elRemoveClass).addClass(titleSlider.elAddClass);
      }
    }, 3500);
  },
  clear: function () {
    $(titleSlider.el).removeClass('fade-in');
    window.clearTimeout(this.slider);
  }
};

/* ===========================================
Video change background
=========================================== */

var video = {
  FSbackgroundChange: function () {
    // Entering fullscreen mode
    $('video').bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
      var fullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

      if (fullScreen) {
        $(this).addClass('fullscreen');
      } else {
        $(this).removeClass('fullscreen');
      }

    });
  },
  hoverControls: function () {
    $('video').on({
      mouseenter: function () {
        $(this).attr("controls", "controls");
      },
      mouseleave: function () {
        $(this).removeAttr("controls");
      }
    });
  }
};

/* ===========================================
Truncate description
=========================================== */

var truncateText = {
  init: function (els, elToKeep) {
    $(els).each(function (i, obj) {
      $el = $(this);

      $el.dotdotdot({
        watch: 'window',
        after: elToKeep
      });

    });
  }
};


/* ===========================================
 Newsletter form
 =========================================== */

var formManagement = {

  init: function (el) {
    $(el).submit(function (e) {
      e.preventDefault();

      var $form = $(this);

      var posting = $.post($form.attr("action"), $form.serialize());

      var lang = ($('input[name="lang"]').val());
      var email = ($('input[name="email"]').val());

      var addressBookID = "1082130";

      if (lang == "fr") {
        addressBookID = "1082132";
      }
      if (lang == "de") {
        addressBookID = "1082131";
      }

      if (el.indexOf("newsletter") !== -1) {
        $.post("https://api.mailpro.com/v2/email/add.xml", {
          IDClient: "155853",
          APIKey: "4AF79731-2105-407C-B2AB-8826E82A82C4",
          AddressBookID: addressBookID,
          EmailList: email + ",,," + lang
        });
      }

      // Put the results in a div
      posting.done(function () {
        $('.form-done').show();
        $('input[type="submit"]').prop('disabled',true);
        $('input[type="submit"]').val('✓');
        $('input[type="submit"]').addClass('submitted');
        console.log('success');
      });
      posting.fail(function () {
        $('.form-fail').show();
        console.log('error');
      });
    
    return false;
    });
  }
};


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
      zoom: 7,
      scrollwheel: false
    });
    mapManagement.placeMarker();
    mapManagement.map.setOptions({
      styles: style
    });
  },
  placeMarker: function () {
    $.getJSON("geodata/venues.json", function (data) {
      $.each(data, function (key, val) {
        var myLatLng = {
          lat: val.lat,
          lng: val.lng
        };
        console.log(myLatLng)
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: mapManagement.map,
          icon: '/images/venues/location_v2.png',
          title: 'Click!'
        });
        var content = "<h1>" + val.title + "</h1><p>" + val.description + "</p><p><a href=" + val.link + " target='_blank'>More</a></p>";
        var infowindow = new google.maps.InfoWindow({
          content: content
        });
        marker.addListener('click', function () {
          infowindow.open(mapManagement.map, marker);
        });
      });
    });
  }
};

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
];

/* ===========================================
   jquery Timeago Locale
   =========================================== */

var localeTimeAgo = {
  de: {
    prefixAgo: "vor",
    prefixFromNow: "in",
    suffixAgo: "",
    suffixFromNow: "",
    seconds: "wenigen Sekunden",
    minute: "etwa einer Minute",
    minutes: "%d Minuten",
    hour: "etwa einer Stunde",
    hours: "%d Stunden",
    day: "etwa einem Tag",
    days: "%d Tagen",
    month: "etwa einem Monat",
    months: "%d Monaten",
    year: "etwa einem Jahr",
    years: "%d Jahren"
  },
  it: {
    prefixAgo: "da",
    prefixFromNow: "entro",
    suffixAgo: "",
    suffixFromNow: "",
    seconds: "meno di un minuto",
    minute: "circa un minuto",
    minutes: "circa %d minuti",
    hour: "circa un’ora",
    hours: "circa %d ore",
    day: "circa un giorno",
    days: "circa %d giorni",
    month: "circa un mese",
    months: "circa %d mesi",
    year: "un anno",
    years: "%d anni"
  },
  fr: {
    prefixAgo: "il y a",
    prefixFromNow: "d'ici",
    seconds: "moins d'une minute",
    minute: "environ une minute",
    minutes: "environ %d minutes",
    hour: "environ une heure",
    hours: "environ %d heures",
    day: "environ un jour",
    days: "environ %d jours",
    month: "environ un mois",
    months: "environ %d mois",
    year: "un an",
    years: "%d ans"
  },
  en: {
    prefixAgo: null,
    prefixFromNow: null,
    suffixAgo: "ago",
    suffixFromNow: "from now",
    seconds: "less than a minute",
    minute: "about a minute",
    minutes: "%d minutes",
    hour: "about an hour",
    hours: "about %d hours",
    day: "a day",
    days: "%d days",
    month: "about a month",
    months: "%d months",
    year: "about a year",
    years: "%d years",
    wordSeparator: " ",
    numbers: []
  }
};

