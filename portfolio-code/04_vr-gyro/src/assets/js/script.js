// -----------------------------------------------------------------------------
// VARIABLE
// -----------------------------------------------------------------------------
let camera;
let scene;
let renderer;
let light;

let room;
let roomGeometry;
let roomMaterial;

let sphere;
let sphereGroup;
let sphereGeometry;
let sphereMatrial;

const polyfill = new WebVRPolyfill();





// -----------------------------------------------------------------------------
// FUNCTION window load
// -----------------------------------------------------------------------------
window.addEventListener('load', () => {
  initialize();
  animate();
}, false);



// -----------------------------------------------------------------------------
// FUNCTION initialize
// -----------------------------------------------------------------------------
const initialize = () => {

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x505050);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);

  roomGeometry = new THREE.BoxLineGeometry(6, 6, 6, 10, 10, 10);
  roomMaterial = new THREE.LineBasicMaterial({color:0x808080});
  room         = new THREE.LineSegments(roomGeometry, roomMaterial);
  room.geometry.translate(0, 3, 0);
  scene.add(room);

  light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(1, 1, 1);
  scene.add(light);

  sphereGroup = new THREE.Group();
  sphereGroup.position.set(0, 0, 0);
  room.add(sphereGroup);

  sphereGeometry = new THREE.IcosahedronBufferGeometry(0.08, 2);
  sphereMaterial = new THREE.MeshNormalMaterial();
  for(let i = 0; i < 20; i++){
    let sphereMesh   = new THREE.Mesh(sphereGeometry, sphereMaterial);
    let sphereRadian = i / 20 * Math.PI * 2;
    sphereMesh.position.x = Math.cos(sphereRadian);
    sphereMesh.position.y = 1.25;
    sphereMesh.position.z = Math.sin(sphereRadian);
    sphereGroup.add(sphereMesh);
  };

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.vr.enabled = true;
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(WEBVR.createButton(renderer));

  window.addEventListener('resize', () => {
    onWindowResize();
  }, false);

  window.addEventListener('deviceorientation', (e) => {
    let gyroY = e.gamma.toFixed(2);
    gyroY = gyroY / 90 + 0.01 * gyroY;
    gyroY = gyroY * -1;
    onWindowGyro(gyroY);
  }, false);

};



// -----------------------------------------------------------------------------
// FUNCTION onWindowResize
// -----------------------------------------------------------------------------
const onWindowResize = () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

};



// -----------------------------------------------------------------------------
// FUNCTION onWindowGyro
// -----------------------------------------------------------------------------
const onWindowGyro = (gyro) => {
  sphereGroup.rotation.y = gyro;
}



// -----------------------------------------------------------------------------
// FUNCTION animate
// -----------------------------------------------------------------------------
const animate = () => {

  renderer.setAnimationLoop(render);

};



// -----------------------------------------------------------------------------
// FUNCTION render
// -----------------------------------------------------------------------------
const render = () => {

  renderer.render(scene, camera);

};
