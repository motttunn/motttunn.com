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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/js/script.js":
/*!*********************************!*\
  !*** ./src/assets/js/script.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// -----------------------------------------------------------------------------\n// VARIABLE\n// -----------------------------------------------------------------------------\nvar camera;\nvar scene;\nvar renderer;\nvar light;\nvar room;\nvar roomGeometry;\nvar roomMaterial;\nvar sphere;\nvar sphereGroup;\nvar sphereGeometry;\nvar sphereMatrial;\nvar polyfill = new WebVRPolyfill(); // -----------------------------------------------------------------------------\n// FUNCTION window load\n// -----------------------------------------------------------------------------\n\nwindow.addEventListener('load', function () {\n  initialize();\n  animate();\n}, false); // -----------------------------------------------------------------------------\n// FUNCTION initialize\n// -----------------------------------------------------------------------------\n\nvar initialize = function initialize() {\n  scene = new THREE.Scene();\n  scene.background = new THREE.Color(0x505050);\n  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);\n  roomGeometry = new THREE.BoxLineGeometry(6, 6, 6, 10, 10, 10);\n  roomMaterial = new THREE.LineBasicMaterial({\n    color: 0x808080\n  });\n  room = new THREE.LineSegments(roomGeometry, roomMaterial);\n  room.geometry.translate(0, 3, 0);\n  scene.add(room);\n  light = new THREE.HemisphereLight(0xffffff, 0x444444);\n  light.position.set(1, 1, 1);\n  scene.add(light);\n  sphereGroup = new THREE.Group();\n  sphereGroup.position.set(0, 0, 0);\n  room.add(sphereGroup);\n  sphereGeometry = new THREE.IcosahedronBufferGeometry(0.08, 2);\n  sphereMaterial = new THREE.MeshNormalMaterial();\n\n  for (var i = 0; i < 20; i++) {\n    var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);\n    var sphereRadian = i / 20 * Math.PI * 2;\n    sphereMesh.position.x = Math.cos(sphereRadian);\n    sphereMesh.position.y = 1.25;\n    sphereMesh.position.z = Math.sin(sphereRadian);\n    sphereGroup.add(sphereMesh);\n  }\n\n  ;\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setPixelRatio(window.devicePixelRatio);\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  renderer.vr.enabled = true;\n  document.body.appendChild(renderer.domElement);\n  document.body.appendChild(WEBVR.createButton(renderer));\n  window.addEventListener('resize', function () {\n    onWindowResize();\n  }, false);\n  window.addEventListener('deviceorientation', function (e) {\n    var gyroY = e.gamma.toFixed(2);\n    gyroY = gyroY / 90 + 0.01 * gyroY;\n    gyroY = gyroY * -1;\n    onWindowGyro(gyroY);\n  }, false);\n}; // -----------------------------------------------------------------------------\n// FUNCTION onWindowResize\n// -----------------------------------------------------------------------------\n\n\nvar onWindowResize = function onWindowResize() {\n  camera.aspect = window.innerWidth / window.innerHeight;\n  camera.updateProjectionMatrix();\n  renderer.setSize(window.innerWidth, window.innerHeight);\n}; // -----------------------------------------------------------------------------\n// FUNCTION onWindowGyro\n// -----------------------------------------------------------------------------\n\n\nvar onWindowGyro = function onWindowGyro(gyro) {\n  sphereGroup.rotation.y = gyro;\n}; // -----------------------------------------------------------------------------\n// FUNCTION animate\n// -----------------------------------------------------------------------------\n\n\nvar animate = function animate() {\n  renderer.setAnimationLoop(render);\n}; // -----------------------------------------------------------------------------\n// FUNCTION render\n// -----------------------------------------------------------------------------\n\n\nvar render = function render() {\n  renderer.render(scene, camera);\n};\n\n//# sourceURL=webpack:///./src/assets/js/script.js?");

/***/ })

/******/ });