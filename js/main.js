/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/modules/footer/footer.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/footer/footer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  var $articleBtn = $(".js-article-btn");
  var $articleBody = $(".js-article-body");
  $articleBtn.on("click", function () {
    $(this).toggleClass("active");
    $articleBody.toggleClass("active");
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/blocks/modules/form/form.js":
/*!*****************************************!*\
  !*** ./src/blocks/modules/form/form.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  var $form = $('.js-form');
  var regex = '\\+7 \\([0-6,9]{1}[0-9]{2}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}';
  $("[type='tel']").inputmask({
    regex: regex
  });
  $(".js-form-select").select2({
    language: {
      noResults: function noResults() {
        return "Ничего не найдено";
      }
    }
  });

  var phoneReplace = function phoneReplace(string) {
    return string.replace(/[^\d\+]/g, '');
  };

  var inputChange = function inputChange(input) {
    return input.on("input", function (e) {
      return $(e.target).parent().removeClass("error");
    });
  };

  $form.on('submit', function (e) {
    e.preventDefault();
    var target = $(e.target);
    var url = target.attr("action");
    var formInput = target.find("[type='tel']");
    var formCheckbox = target.find("[type='checkbox']");
    var isChecked = !!formCheckbox.length ? formCheckbox.is(":checked") : true;
    var button = target.find(".js-form-submit");
    var phone = phoneReplace(formInput.val().slice(1));
    inputChange($(e.target).find("input"));

    if (phone.length < 11) {
      formInput.focus();
      formInput.parent().addClass("error");
    }

    if (!isChecked) formCheckbox.parent().addClass("error");

    if (phone.length === 11 && isChecked) {
      button.attr("disabled", true);
      $.ajax({
        type: "POST",
        url: url,
        data: {
          phone: phone
        },
        success: function success(response) {
          e.target.reset();
          button.attr("disabled", false);
          $.magnificPopup.close();
          $.magnificPopup.open({
            items: {
              src: '#modal-success'
            },
            type: 'inline',
            callbacks: {
              open: function open() {// setTimeout(()=> $.magnificPopup.close(), 3000)
              }
            }
          });
        },
        error: function error(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
      });
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/blocks/modules/header/header.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/header/header.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  var $headerBtn = $('.js-header-burger');
  var $headerMenu = $('.js-header__menu');
  var $body = $("body");

  var removeClass = function removeClass() {
    $headerBtn.removeClass('active');
    $headerMenu.removeClass('active');
    $body.removeClass("hidden");
  };

  var toggleClasses = function toggleClasses() {
    $headerBtn.eq(0).toggleClass('active');
    $headerMenu.toggleClass('active');
    $body.toggleClass("hidden");
  };

  $headerBtn.on('click', toggleClasses);
  $headerMenu.children().on('click', removeClass);
  $(window).on('click', function (e) {
    if (!$headerMenu.is(e.target) && $headerMenu.has(e.target).length === 0 && !$headerBtn.is(e.target) && $headerBtn.has(e.target).length === 0) removeClass();
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/blocks/modules/map/map.js":
/*!***************************************!*\
  !*** ./src/blocks/modules/map/map.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  ymaps.ready(init);
  var newMap;
  var place;

  function init() {
    newMap = new ymaps.Map("ymaps", {
      center: [55.853471, 37.679071],
      zoom: 14,
      controls: []
    });
    place = new ymaps.Placemark([55.853471, 37.679071], {
      hintContent: "ШКОДА ЯРОСЛАВКА"
    }, {
      iconLayout: 'default#image',
      iconImageHref: "./img/content/pin.png",
      iconImageSize: [58, 86]
    });
    newMap.geoObjects.add(place);
    var width = $(window).width();
    if (width < 770) newMap.behaviors.disable('drag');
  }

  ;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/blocks/modules/modal/modal.js":
/*!*******************************************!*\
  !*** ./src/blocks/modules/modal/modal.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  $('.js-popup-link').magnificPopup({
    type: 'inline',
    midClick: true
  });
  $(".js-popup-close").on("click", function () {
    $.magnificPopup.close();
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/js/import/global.js":
/*!*********************************!*\
  !*** ./src/js/import/global.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  $(document).on('click', '.js-anchor', function (event) {
    event.preventDefault();
    var data = $(this).attr("data-is");

    if (data) {
      $('.js-anchor').removeClass('active');
      $(this).addClass('active');
    }

    $('html, body').stop(true, true).delay(200).animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/js/import/modules.js":
/*!**********************************!*\
  !*** ./src/js/import/modules.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! %modules%/header/header */ "./src/blocks/modules/header/header.js");
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_header_header__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %modules%/footer/footer */ "./src/blocks/modules/footer/footer.js");
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_footer_footer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global */ "./src/js/import/global.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_global__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_form_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! %modules%/form/form */ "./src/blocks/modules/form/form.js");
/* harmony import */ var _modules_form_form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_form_form__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_map_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! %modules%/map/map */ "./src/blocks/modules/map/map.js");
/* harmony import */ var _modules_map_map__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_map_map__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_modal_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! %modules%/modal/modal */ "./src/blocks/modules/modal/modal.js");
/* harmony import */ var _modules_modal_modal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_modal_modal__WEBPACK_IMPORTED_MODULE_5__);







/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map