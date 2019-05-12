
const WIDTH  = window.innerWidth;
const HEIGHT = window.innerHeight;

const CAMERA_ANGLE  = 45;
const CAMERA_ASPECT = WIDTH / HEIGHT;
const CAMERA_NEAR   = 1;
const CAMERA_FAR    = 500;

let camera;
let scene;
let renderer;

let ground;
let groundMirror;

let plane;
let planeMirror;

let wallLeft;
let wallRight;
let wallTop;
let wallBottom;
let wallGeometry;
let wallMaterial;

let sphere;
let sphereGeometry;
let sphereMaterial;

let light;



window.addEventListener('load', () => {

  init();

  animate();

}, false);



const init = () => {

  camera = new THREE.PerspectiveCamera(CAMERA_ANGLE, CAMERA_ASPECT, CAMERA_NEAR, CAMERA_FAR);
  camera.position.set(0, 75, 240);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);

  ground       = new THREE.CircleBufferGeometry(40, 64);
  groundMirror = new THREE.Reflector(ground, {
    clipBias: 0.003,
    textureWidth: WIDTH * window.devicePixelRatio,
    textureHeight: HEIGHT * window.devicePixelRatio,
    color: 0x777777,
    recursion: 1
  });
  groundMirror.position.y = 0.5;
  groundMirror.rotateX(- Math.PI / 2);
  scene.add(groundMirror);

  // plane       = new THREE.PlaneBufferGeometry(100, 100);
  plane       = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight);
  planeMirror = new THREE.Reflector(plane, {
    clipBias: 0.003,
    textureWidth: WIDTH * window.devicePixelRatio,
    textureHeight: HEIGHT * window.devicePixelRatio,
    color: 0x889999,
    recursion: 1
  });
  planeMirror.position.y = 50;
  planeMirror.position.z = -50;
  scene.add(planeMirror);

  // wallGeometry = new THREE.PlaneBufferGeometry(100.1, 100.1);
  wallGeometry = new THREE.PlaneBufferGeometry(window.innerWidth + 0.01, window.innerHeight + 0.01);
  wallMaterial = new THREE.MeshPhongMaterial({color: 0xeeeeee});

  wallLeft = new THREE.Mesh(wallGeometry, wallMaterial);
  wallLeft.position.x = -50;
  wallLeft.position.y = 50;
  wallLeft.rotateY(Math.PI / 2);
  scene.add(wallLeft);

  wallRight = new THREE.Mesh(wallGeometry, wallMaterial);
  wallRight.position.x = 50;
  wallRight.position.y = 50;
  wallRight.rotateY(-Math.PI / 2);
  scene.add(wallRight);

  wallTop = new THREE.Mesh(wallGeometry, wallMaterial);
  wallTop.position.y = 100;
  wallTop.rotateX(Math.PI / 2);
  scene.add(wallTop);

  wallBottom = new THREE.Mesh(wallGeometry, wallMaterial);
  wallBottom.rotateX(-Math.PI / 2);
  scene.add(wallBottom);

  wallFront = new THREE.Mesh(wallGeometry, wallMaterial);
  wallFront.rotateY(Math.PI);
  wallFront.position.y = 50;
  wallFront.position.z = 100;
  scene.add(wallFront);

  sphereGeometry = new THREE.IcosahedronBufferGeometry(5, 0);
  sphereMaterial = new THREE.MeshPhongMaterial({color: 0x00bfa5, emissive: 0x00bfa5, flatShading: true});
  sphere         = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  light = new THREE.PointLight(0xffffff, 1.5, 250);
  light.position.y = 50;
  light.position.z = 25;
  scene.add(light);

};



const animate = () => {

  requestAnimationFrame(animate);

  let time = Date.now() * 0.001;

  sphere.position.set(
    Math.cos(time) * 24,
    8,
    Math.sin(time) * 24
  );

  renderer.render(scene, camera);

};
