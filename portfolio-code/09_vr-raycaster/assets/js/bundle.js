!function(e){var n={};function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(i,o,function(n){return e[n]}.bind(null,o));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){var t,i,o,r,a,d,c,l,s,u,w,E;new WebVRPolyfill;window.addEventListener("load",function(){p(),f()},!1);var p=function(){(i=new THREE.Scene).background=new THREE.Color(15658734),t=new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,.1,10),d=new THREE.BoxLineGeometry(6,6,6,10,10,10),c=new THREE.LineBasicMaterial({color:5533306}),(a=new THREE.LineSegments(d,c)).geometry.translate(0,3,0),i.add(a),(r=new THREE.HemisphereLight(16777215,4473924)).position.set(1,1,1),i.add(r),s=new THREE.IcosahedronBufferGeometry(1,0),icosahedronMaterial=new THREE.MeshLambertMaterial({color:49061}),(l=new THREE.Mesh(s,icosahedronMaterial)).scale.set(.075,.075,.075),l.position.set(0,1.25,-1.25),a.add(l),u=new THREE.Vector3(0,1.5,-1.25),w=new THREE.Raycaster,E=new THREE.ArrowHelper(w.ray.direction,w.ray.origin,100,49061),i.add(E),(o=new THREE.WebGLRenderer({antialias:!0})).setPixelRatio(window.devicePixelRatio),o.setSize(window.innerWidth,window.innerHeight),o.vr.enabled=!0,document.body.appendChild(o.domElement),document.body.appendChild(WEBVR.createButton(o)),window.addEventListener("resize",function(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)},!1)},f=function(){o.setAnimationLoop(y)},y=function(){var e=new THREE.Vector3(l.position.x,l.position.y,l.position.z),n=new THREE.Vector3(w.ray.direction.x,w.ray.direction.y+1.5,w.ray.direction.z),r=new THREE.Vector3;r.subVectors(n,e);var a=r.normalize(),d=n.distanceTo(e),c=Math.min(d,2)/2;u=u.add(a).multiplyScalar(.01).normalize(),l.position.x+=.2*u.x*c,l.position.y+=.2*u.y*c,l.position.z+=.2*u.z*c,E.setDirection(w.ray.direction),w.set(t.getWorldPosition(),t.getWorldDirection()),o.render(i,t)}}]);