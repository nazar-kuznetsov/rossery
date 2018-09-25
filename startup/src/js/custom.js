//==========================libs===========================
///= 'libs/validate.js'
//= 'libs/jquery.parallax.min.js'

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



$(window).ready(function () {
  setTimeout(function () {
    $('body').addClass('load');
  }, 500);





  function touches(e) {
    var x = e.touches ? e.touches[0].clientX : e.clientX,
      y = e.touches ? e.touches[0].clientY : e.clientY;
    var w = window.innerWidth / 2;
    var h = window.innerHeight / 2;

    var l = -(x - w) / (w / 10) - 10;
    var t = -(y - h) / (h / 10) - 10;
    //10 / (y - (h / 2)) * 100;
    // console.log(y + ' | ' + h + ' | ' + t);

    TweenMax.to($('.bgimg'), 1, {
      top: t + "%",
      left: l + "%"
    });

  }

  var bg = document.getElementById('bg');

  bg.addEventListener("mousemove", touches);
  bg.addEventListener("touchstart", touches);
  bg.addEventListener("touchmove", touches);


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


  var tel = document.querySelector('.tel');

  tel.addEventListener('keydown', function (e) {
    if (tel.value.length > 10) {
      tel.value = tel.value.substr(0, 11);
    }

    var key = e.keyCode;
    var len = e.target.value.length;
    if (key === 8) return;

    switch (len) {
      case 2:
        tel.value += ' ';
        break;
      case 6:
        tel.value += ' ';
        break;
      case 9:
        tel.value += ' ';
        break;
    }
  })


  var formModal = document.getElementById('form-modal');
  var docsSuccess = document.getElementById('docs-success');

  function Validate(settings) {
    this.form = $(settings.form);
    this.inputs = this.form.find('[data-validate]');
    // this.form.on('submit', this.submit.bind(this, this.inputs));
    this.form.on('submit', (event) => {
      this.submit.call(this, this.inputs, event);
    });
    this.send = settings.send || function () { };
    this.ready = settings.ready || function () { };
    this.massageEmpty = settings.massageEmpty || {};
    this.massageError = settings.massageError || {};

    this.inputs.each((index, item) => {
      $(item).on('change', this.submit.bind(this, $(item)));
    });

    this.regExp = {
      name: /^.{2,80}$/,
      email: /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
      tel: /^[\s()+-]*([0-9][\s()+-]*){6,20}$/,
      textarea: /^\s*([\`\'\"\(\)a-zа-я0-9-іїёє\._-]\s*){25,75}$/i,
    };


    // сообщение по умолчанию
    this.massage = {
      empty: {
        name: this.massageEmpty.name || 'Введіть ім\'я',
        email: this.massageEmpty.email || 'Введіть поштову скриньку ',
        textarea: this.massageEmpty.textarea || 'textarea не может быть пустым',
        tel: this.massageEmpty.tel || 'Введіть номер телефону',
        checkbox: this.massageEmpty.checkbox || 'Вам нужно соглалистя с условиями',
      },
      error: {
        name: this.massageError.name || 'Ім\'я повинно бути від 2 до 80 символів',
        email: this.massageError.email || 'Приклад: alexsandr@gmail.com',
        textarea: this.massageError.textarea || 'Мин 25 символов максимум 150',
        tel: this.massageError.tel || 'Телефон повинен містити тільки цифри',
      },
    };

    castomInput(settings.massageEmpty, this.massage.empty);
    castomInput(settings.massageError, this.massage.error);
    castomInput(settings.regExp, this.regExp);

    function castomInput(rule, obj) {
      // добавляем новый текст сообщение или регулярку
      if (rule !== undefined) {
        for (let i in rule) {
          obj[i] = rule[i];
        }
      }
    }

  }

  Validate.prototype.submit = function (elements, event) {
    event.preventDefault();
    const error = [];

    for (let i = 0; i < elements.length; i++) {
      const input = elements.eq(i),
        key = input.attr('data-validate'),
        parent = input.parent(),
        value = input.val();

      if (input.attr('type') === 'checkbox' && !input.prop('checked') || // если checkbox проверяем на prop
        input.attr('type') !== 'checkbox' && !this.regExp[key].test(value)) { // если поле проверчем на ругелярках

        error.push({
          input: input,
          parent: parent,
          key: key,
        });

        parent.removeClass('succes');
      } else {
        parent.removeClass('error');
        input.next('.error-massage').html('');
        parent.addClass('succes');
      }
    }


    // показываем ошибки
    if (error.length > 0) {
      //error[0].input.trigger('focus'); // добавляем focus в поле с ошибкой
      for (let i = 0; i < error.length; i++) {
        const input = error[i].input,
          parent = error[i].parent,
          key = error[i].key;

        parent.addClass('error');

        if (!input.next().hasClass('error-massage')) {
          input.after('<p class="error-massage"></p>');
        }

        if (event.type === 'submit' || input.val().length === 0) {
          this.massage.empty[key] !== undefined ? input.next().html(this.massage.empty[key]) : input.next().html(this.massage.error[key]);
        } else {
          this.massage.error[key] !== undefined ? input.next().html(this.massage.error[key]) : input.next().html(this.massage.empty[key]);
        }
      }

      return false;
    }


    // this.ready(this.form);

    // успешно
    if (event.type !== 'submit') return false;
    this.send(this.form);
    this.inputs.parent().removeClass('succes');
    this.form[0].reset();
  };


  new Validate({
    form: '#form',
    regExp: {
      card: /\d/,
    },
    massageEmpty: {
      card: 'Введите номер кредитки',
    },
    massageError: {
      card: 'Номер карты не валидынй',
    },
    ready: function (form) {

    },
    send: function (form) {
      formModal.classList.remove('modal-open');
      docsSuccess.classList.add('modal-open');

      $.ajax({
        type: "POST", //Метод отправки
        url: "send.php", //путь до php фаила отправителя
        data: form.serialize(),
        success: function () {

        }
      });
    }
  });

  var fill = document.querySelectorAll('.form-col');


  document.querySelector('.btn-end').addEventListener('click', function () {
    formModal.classList.remove('modal-open');
    docsSuccess.classList.remove('modal-open');
    fill.forEach(function (item) {
      item.classList.remove('filled');
    })
  });


  google.maps.event.addDomListener(window, 'load', init);

  function init() {
    var mapOptions = {
      zoom: 15,
      disableDefaultUI: true,
      scrollwheel: true,

      center: new google.maps.LatLng(50.468636, 30.612774),

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

  inputs.on('keyup', function (event) {
    if ($(this).val() != '') {
      $(this).parent().addClass('filled');
    } else {
      $(this).parent().removeClass('filled');
    }
  });

  inputs.each(function (index, el) {
    if ($(this).val() != '') {
      $(this).parent().addClass('filled');
    } else {
      $(this).parent().removeClass('filled');
    }
  });


  var mobileMenu = document.querySelector('.mobile-menu');

  function mobileToggle() {
    mobileMenu.classList.toggle('isOpen');

  }

  document.querySelector('.btn-menu').addEventListener('click', mobileToggle);

  document.querySelector('.mobile-close').addEventListener('click', mobileToggle);




})



