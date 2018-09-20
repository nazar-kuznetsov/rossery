//==========================libs===========================
//= ../libs/jquery/jquery.min.js
///= 'libs/validate.js'

///= ../libs/jquery-validate/jquery.validate.min.js
///= ../libs/slick/slick.min.js
///= ../libs/wow-js/wow.min.js

//==========================custom==========================


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




var modalBtn = document.querySelectorAll('.modal-btn');
var closeBtn = document.querySelectorAll('.modal-close');

var overlay = document.querySelectorAll('.overlay-modal');

overlay.forEach(function (element) {
  element.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-open')) {
      this.classList.remove('modal-open');
    }
  })
})

modalBtn.forEach(function (link) {
  link.addEventListener('click', getModal);
});

closeBtn.forEach(function (close) {
  close.addEventListener('click', getClose);
});


function getClose(e) {
  e.preventDefault();
  var overlay = this.parentNode.parentNode;
  overlay.classList.remove('modal-open');
}



function getModal(e) {
  e.preventDefault();
  var id = this.getAttribute('data-modal');
  openModal(id);
}

function openModal(id) {
  var modal = document.querySelector(id);
  modal.classList.add('modal-open');
}


var btnMapChange = document.querySelector('#btn-map-change');
var rightCol = document.querySelector('.right-col');


btnMapChange.addEventListener('click', function (e) {
  e.preventDefault();
  rightCol.classList.toggle('open-map');
  this.classList.toggle('icon-map-close');
})


var btnDone = document.getElementById('btn-done');

btnDone.addEventListener('click', function () {
  document.getElementById('form-modal').classList.remove('modal-open');
})



// var tel = document.querySelector('.tel');
// tel.addEventListener('keydown', function (e) {
//   if (tel.value.length > 10) {
//     tel.value = tel.value.substr(0, 11);
//   }

//   var key = e.keyCode;
//   var len = e.target.value.length;
//   if (key === 8) return;

//   switch (len) {
//     case 2:
//       tel.value += ' ';
//       break;
//     case 6:
//       tel.value += ' ';
//       break;
//     case 9:
//       tel.value += ' ';
//       break;
//   }



// })

// tel.addEventListener('input', function () {
//   this.value = this.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
// })

google.maps.event.addDomListener(window, 'load', init);

function init() {
  var mapOptions = {
    zoom: 15,
    disableDefaultUI: true,
    scrollwheel: true,

    center: new google.maps.LatLng(50.468006, 30.609616),

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
  var myLatLng = new google.maps.LatLng(50.468006, 30.609616);

  new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: '',
    icon: ''
  });
}

var inputs = $('input');

inputs.on('keyup', function(event) {
        if ( $(this).val() != '' ){
          $(this).parent().addClass('filled');
        } else {
          $(this).parent().removeClass('filled');
        }
      });

      inputs.each(function(index, el) {
        if ( $(this).val() != '' ){
          $(this).parent().addClass('filled');
        } else {
          $(this).parent().removeClass('filled');
        }
});

