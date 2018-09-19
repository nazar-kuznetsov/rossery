//==========================libs===========================
//= ../libs/jquery/jquery.min.js
///= 'libs/validate.js'

///= ../libs/jquery-validate/jquery.validate.min.js
///= ../libs/slick/slick.min.js
///= ../libs/wow-js/wow.min.js

//==========================custom==========================
$(function () {

  /*preloader
  ===============*/
  // setTimeout(function () {
  //   $('#preloader').fadeOut();
  // }, 500);

  /*btn-icon-nav-toggle
    =========================*/
  // $('.btn-toggle').on('click', function () {
  //   $(this).toggleClass('change');
  // });

  /*
    new Validate({
      form: '#form',
      regExp: {
        card: /\d/,
      },
      massageEmpty: {
        card: 'Введите номер кредитки',
        tel: 'tel',
      },
      massageError: {
        card: 'Номер карты не валидынй',
        tel: 'enter your number'
      },
      ready: function (form) {
        console.log(form);
      },
      send: function (form) {
        alert('успешно');
      }
    });
  */




});


google.maps.event.addDomListener(window, 'load', init);

function init() {
  var mapOptions = {
    zoom: 17,
    disableDefaultUI: true,
    scrollwheel: true,

    center: new google.maps.LatLng(50.451200, 30.524423),

    styles: [{
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "stylers": [{
            "hue": "#00aaff"
          },
          {
            "saturation": -100
          },
          {
            "gamma": 2.15
          },
          {
            "lightness": 12
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
            "visibility": "on"
          },
          {
            "lightness": 24
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "lightness": 57
        }]
      }
    ]
  };


  var mapElement = document.getElementById('map');

  var map = new google.maps.Map(mapElement, mapOptions);
  // var image = "img/elements/map.svg";
  var myLatLng = new google.maps.LatLng(50.451200, 30.524423);

  new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: '',
    icon: ''
  });
}

