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

let icosahedron;
let icosahedronGeometry;
let icosahedronMatrial;
let icosahedronDirection;

let raycaster;
let arrow;

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
  scene.background = new THREE.Color(0xeeeeee);

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10);

  roomGeometry = new THREE.BoxLineGeometry(6, 6, 6, 10, 10, 10);
  roomMaterial = new THREE.LineBasicMaterial({color:0x546e7a});
  room         = new THREE.LineSegments(roomGeometry, roomMaterial);
  room.geometry.translate(0, 3, 0);
  scene.add(room);

  light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(1, 1, 1);
  scene.add(light);

  icosahedronGeometry = new THREE.IcosahedronBufferGeometry(1, 0);
  icosahedronMaterial = new THREE.MeshLambertMaterial({color: 0x00bfa5});
  icosahedron     = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
  icosahedron.scale.set(0.075, 0.075, 0.075);
  icosahedron.position.set(0, 1.25, -1.25);
  room.add(icosahedron);
  icosahedronDirection = new THREE.Vector3(0, 1.5, -1.25);

  raycaster = new THREE.Raycaster();
  arrow     = new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 100, 0x00bfa5);
  scene.add(arrow);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.vr.enabled = true;
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(WEBVR.createButton(renderer));

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);

};



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

  let icosahedronPosition = new THREE.Vector3(
    icosahedron.position.x,
    icosahedron.position.y,
    icosahedron.position.z
  );

  let raycasterPosition = new THREE.Vector3(
    raycaster.ray.direction.x,
    raycaster.ray.direction.y + 1.5,
    raycaster.ray.direction.z
  );

  let baseRaycaster = new THREE.Vector3();
  baseRaycaster.subVectors(raycasterPosition, icosahedronPosition);
  let normalizeRaycaster = baseRaycaster.normalize();

  let baseDistance   = raycasterPosition.distanceTo(icosahedronPosition);
  let adjustDistance = Math.min(baseDistance, 2.0) / 2.0;

  icosahedronDirection = icosahedronDirection.add(normalizeRaycaster).multiplyScalar(0.01).normalize();

  icosahedron.position.x += icosahedronDirection.x * 0.2 * adjustDistance;
  icosahedron.position.y += icosahedronDirection.y * 0.2 * adjustDistance;
  icosahedron.position.z += icosahedronDirection.z * 0.2 * adjustDistance;

  arrow.setDirection(raycaster.ray.direction);
  raycaster.set(camera.getWorldPosition(), camera.getWorldDirection());

  renderer.render(scene, camera);

};
