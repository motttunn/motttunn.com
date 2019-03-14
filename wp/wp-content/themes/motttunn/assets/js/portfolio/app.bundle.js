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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/js/portfolio/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/js/include/module.js":
/*!*****************************************!*\
  !*** ./src/assets/js/include/module.js ***!
  \*****************************************/
/*! exports provided: toggleHeader, parallaxThumbnail, anchorLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleHeader\", function() { return toggleHeader; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parallaxThumbnail\", function() { return parallaxThumbnail; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"anchorLink\", function() { return anchorLink; });\nvar breakPoint = 1023;\nvar resizeFlag = false;\nvar windowWidth = window.innerWidth;\nvar windowHeight = window.innerHeight; // let windowWidthJ = $(window).width();\n// ------------------------------------------------------------------------\n// toggleHeader\n// ----- BOTH\n// ------------------------------------------------------------------------\n\nvar toggleHeader = function toggleHeader() {\n  var headerFlag = false;\n  var headerButton = document.getElementById('st-Header_Button');\n  var headerNav = document.getElementById('st-Header_Nav');\n  var headerNavClose = document.getElementById('st-Header_Nav_List_Item-Close');\n\n  if (windowWidth > breakPoint) {\n    headerButton.addEventListener('mouseenter', function () {\n      headerButton.classList.add('st-Header_Button-Hidden');\n      headerNav.classList.remove('st-Header_Nav-Hidden');\n    }, false);\n    headerNav.addEventListener('mouseleave', function () {\n      headerButton.classList.remove('st-Header_Button-Hidden');\n      headerNav.classList.add('st-Header_Nav-Hidden');\n    }, false);\n  } else {\n    headerButton.addEventListener('click', function () {\n      if (!headerFlag) {\n        headerButton.classList.add('st-Header_Button-Hidden');\n        headerNav.classList.remove('st-Header_Nav-Hidden');\n        headerFlag = true;\n      }\n    }, false);\n    headerNavClose.addEventListener('click', function () {\n      if (headerFlag) {\n        headerButton.classList.remove('st-Header_Button-Hidden');\n        headerNav.classList.add('st-Header_Nav-Hidden');\n        headerFlag = false;\n      }\n    }, false);\n  }\n}; // ------------------------------------------------------------------------\n// parallaxThumbnail\n// ----- BOTH\n// ------------------------------------------------------------------------\n\n\nvar parallaxThumbnail = function parallaxThumbnail() {\n  var scrollVolume = 0;\n  var worksThumbnail = document.getElementsByClassName('st-Works_List_Item_Thumbnail');\n\n  if (windowWidth > breakPoint) {\n    window.addEventListener('scroll', function () {\n      scrollVolume = window.pageYOffset;\n\n      for (var i = 0; i < worksThumbnail.length; i++) {\n        var worksThumbnailTop = worksThumbnail[i].getBoundingClientRect().top;\n        var worksThumbnailWidth = worksThumbnail[i].clientWidth;\n        var worksThumbnailHeight = worksThumbnail[i].clientHeight;\n        var worksThumbnailDifference = scrollVolume - worksThumbnailTop - worksThumbnailHeight * 1.5;\n\n        if (worksThumbnailDifference > 0) {\n          worksThumbnail[i].style.transform = 'translateY(calc(-50% - ' + worksThumbnailDifference / 20 + 'px))';\n        }\n\n        ;\n      }\n    }, false);\n  }\n}; // ------------------------------------------------------------------------\n// anchorLink\n// ----- BOTH\n// ------------------------------------------------------------------------\n\n\nvar anchorLink = function anchorLink() {\n  $(\"a[href^=#]\").on(\"click\", function () {\n    var linkSpeed = 800;\n    var linkHref = $(this).attr(\"href\");\n    var linkTarget = $(linkHref == \"#\" || linkHref == \"\" ? 'html' : linkHref);\n    var linkAdjust = 0;\n    var linkPosition = linkTarget.offset().top;\n\n    if (windowWidthJ > breakPoint) {\n      linkAdjust = 0;\n    } else {\n      linkAdjust = 0;\n    }\n\n    $(\"html, body\").animate({\n      scrollTop: linkPosition - linkAdjust\n    }, linkSpeed, \"swing\");\n    return false;\n  });\n};\n\n\n\n//# sourceURL=webpack:///./src/assets/js/include/module.js?");

/***/ }),

/***/ "./src/assets/js/portfolio/script.js":
/*!*******************************************!*\
  !*** ./src/assets/js/portfolio/script.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _include_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../include/module */ \"./src/assets/js/include/module.js\");\n\n // import { anchorLink } from \"../include/module\";\n\n(function () {\n  Object(_include_module__WEBPACK_IMPORTED_MODULE_0__[\"toggleHeader\"])();\n  Object(_include_module__WEBPACK_IMPORTED_MODULE_0__[\"parallaxThumbnail\"])(); // anchorLink();\n})();\n\n//# sourceURL=webpack:///./src/assets/js/portfolio/script.js?");

/***/ })

/******/ });