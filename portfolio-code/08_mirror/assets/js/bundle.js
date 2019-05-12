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

eval("var WIDTH = window.innerWidth;\nvar HEIGHT = window.innerHeight;\nvar CAMERA_ANGLE = 45;\nvar CAMERA_ASPECT = WIDTH / HEIGHT;\nvar CAMERA_NEAR = 1;\nvar CAMERA_FAR = 500;\nvar camera;\nvar scene;\nvar renderer;\nvar ground;\nvar groundMirror;\nvar plane;\nvar planeMirror;\nvar wallLeft;\nvar wallRight;\nvar wallTop;\nvar wallBottom;\nvar wallGeometry;\nvar wallMaterial;\nvar sphere;\nvar sphereGeometry;\nvar sphereMaterial;\nvar light;\nwindow.addEventListener('load', function () {\n  init();\n  animate();\n}, false);\n\nvar init = function init() {\n  camera = new THREE.PerspectiveCamera(CAMERA_ANGLE, CAMERA_ASPECT, CAMERA_NEAR, CAMERA_FAR);\n  camera.position.set(0, 75, 240);\n  camera.lookAt(0, 0, 0);\n  scene = new THREE.Scene();\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setPixelRatio(window.devicePixelRatio);\n  renderer.setSize(WIDTH, HEIGHT);\n  document.body.appendChild(renderer.domElement);\n  ground = new THREE.CircleBufferGeometry(40, 64);\n  groundMirror = new THREE.Reflector(ground, {\n    clipBias: 0.003,\n    textureWidth: WIDTH * window.devicePixelRatio,\n    textureHeight: HEIGHT * window.devicePixelRatio,\n    color: 0x777777,\n    recursion: 1\n  });\n  groundMirror.position.y = 0.5;\n  groundMirror.rotateX(-Math.PI / 2);\n  scene.add(groundMirror); // plane       = new THREE.PlaneBufferGeometry(100, 100);\n\n  plane = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight);\n  planeMirror = new THREE.Reflector(plane, {\n    clipBias: 0.003,\n    textureWidth: WIDTH * window.devicePixelRatio,\n    textureHeight: HEIGHT * window.devicePixelRatio,\n    color: 0x889999,\n    recursion: 1\n  });\n  planeMirror.position.y = 50;\n  planeMirror.position.z = -50;\n  scene.add(planeMirror); // wallGeometry = new THREE.PlaneBufferGeometry(100.1, 100.1);\n\n  wallGeometry = new THREE.PlaneBufferGeometry(window.innerWidth + 0.01, window.innerHeight + 0.01);\n  wallMaterial = new THREE.MeshPhongMaterial({\n    color: 0xeeeeee\n  });\n  wallLeft = new THREE.Mesh(wallGeometry, wallMaterial);\n  wallLeft.position.x = -50;\n  wallLeft.position.y = 50;\n  wallLeft.rotateY(Math.PI / 2);\n  scene.add(wallLeft);\n  wallRight = new THREE.Mesh(wallGeometry, wallMaterial);\n  wallRight.position.x = 50;\n  wallRight.position.y = 50;\n  wallRight.rotateY(-Math.PI / 2);\n  scene.add(wallRight);\n  wallTop = new THREE.Mesh(wallGeometry, wallMaterial);\n  wallTop.position.y = 100;\n  wallTop.rotateX(Math.PI / 2);\n  scene.add(wallTop);\n  wallBottom = new THREE.Mesh(wallGeometry, wallMaterial);\n  wallBottom.rotateX(-Math.PI / 2);\n  scene.add(wallBottom);\n  wallFront = new THREE.Mesh(wallGeometry, wallMaterial);\n  wallFront.rotateY(Math.PI);\n  wallFront.position.y = 50;\n  wallFront.position.z = 100;\n  scene.add(wallFront);\n  sphereGeometry = new THREE.IcosahedronBufferGeometry(5, 0);\n  sphereMaterial = new THREE.MeshPhongMaterial({\n    color: 0x00bfa5,\n    emissive: 0x00bfa5,\n    flatShading: true\n  });\n  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);\n  scene.add(sphere);\n  light = new THREE.PointLight(0xffffff, 1.5, 250);\n  light.position.y = 50;\n  light.position.z = 25;\n  scene.add(light);\n};\n\nvar animate = function animate() {\n  requestAnimationFrame(animate);\n  var time = Date.now() * 0.001;\n  sphere.position.set(Math.cos(time) * 24, 8, Math.sin(time) * 24);\n  renderer.render(scene, camera);\n};\n\n//# sourceURL=webpack:///./src/assets/js/script.js?");

/***/ })

/******/ });