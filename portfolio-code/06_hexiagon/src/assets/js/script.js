import * as THREE from 'three';



const VERTEX = 7;
const SPLIT  = VERTEX - 1;
const DEGREE = 360 / SPLIT;
const RADIAN = DEGREE * Math.PI / 180;

let camera;
let scene;
let light;
let raycaster;
let renderer;

let geometry;
let material;
let mesh;
let group;

let target;
let mouseCoord = new THREE.Vector2();

let windowWidth;
let windowHeight;

let timeBase;



window.addEventListener('load', () => {

  playVideo();

  init();

  animate();

}, false);



const playVideo = () => {

  let target = document.getElementById('idx-Movie_Video');

  target.play();

};


const init = () => {

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 1000);

  scene = new THREE.Scene();

  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(-1, 1, 1).normalize();
  scene.add(light);

  raycaster = new THREE.Raycaster;

  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0);
  document.body.appendChild(renderer.domElement);

  let positions = new Float32Array(VERTEX * 3);
  let i = 0;
  for (let j = 0; j < VERTEX; j++) {
    let rad = RADIAN * j;
    let sin = Math.sin(rad);
    let cos = Math.cos(rad);
    if (j == 0) {
      positions[i]   = 0;
      positions[i+1] = 0;
      positions[i+2] = 0;
    } else {
      positions[i]   = cos * 60;
      positions[i+1] = sin * 60;
      positions[i+2] = 0;
    }
    i += 3;
  }

  let indexes = new Uint16Array(SPLIT * 3);
  let k = 0;
  for (let l = 0; l < SPLIT; l++) {
    if (l == SPLIT - 1) {
      indexes[k]   = VERTEX - 1;
      indexes[k+1] = 1;
      indexes[k+2] = 0;
    } else {
      indexes[k]   = l+1;
      indexes[k+1] = l+2;
      indexes[k+2] = 0;
    }
    k += 3;
  }

  let normals = new Float32Array(VERTEX * 3);
  let o = 0;
  for (let p = 0; p < VERTEX; p++) {
    normals[o]   = 0.0;
    normals[o+1] = 0.0;
    normals[o+2] = 1.0;
    o += 3;
  }

  geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.setIndex(new THREE.BufferAttribute(indexes, 1));
  material = new THREE.MeshPhongMaterial({color: 0x4AABDE, specular: 0xffffff, shininess: 10});

  // group = new THREE.Group();

  let AMOUNT_X = 32;
  let AMOUNT_Y = 32;
  let ADJUST_X = 98;
  let ADJUST_Y = 112;

  for (let mx = 0; mx < AMOUNT_X; mx++) {
    for (let my = 0; my < AMOUNT_X; my++) {
      mesh = new THREE.Mesh(geometry, material);
      if (mx % 2 == 0) {
        mesh.position.x = mx * ADJUST_X - (ADJUST_X * AMOUNT_X / 2);
        mesh.position.y = my * ADJUST_Y + ADJUST_Y / 2 - (ADJUST_Y * AMOUNT_Y / 2);;
        mesh.position.z = 0;
      } else {
        mesh.position.x = mx * ADJUST_X - (ADJUST_X * AMOUNT_X / 2);
        mesh.position.y = my * ADJUST_Y - (ADJUST_Y * AMOUNT_Y / 2);;
        mesh.position.z = 0;
      }
      // mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      scene.add(mesh);
    }
  };

  document.addEventListener('mousemove', onDocumentMousemove, false);

  window.addEventListener('resize', onWindowResize, false);

};

const onDocumentMousemove = (event) => {

  event.preventDefault();

  mouseCoord.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouseCoord.y = -(event.clientY / window.innerHeight) * 2 + 1;

};

const onWindowResize = () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

};



const animate = () => {

  requestAnimationFrame(animate);

  // requestAnimationFrame(dissolve);

  // setInterval(dissolve())

  render();

};


const render = () => {

  raycaster.setFromCamera(mouseCoord, camera);

  let objects = raycaster.intersectObjects(scene.children);
  if (objects.length > 0) {
    if (target !== objects[0].object) {
      if (target) target.scale.set(1, 1, 1);
      target = objects[0].object;
      target.scale.set(0.00001, 0.00001, 0.00001);
    }
  } else {
    // if (target) target.scale.set(1, 1, 1);
    target = null;
  }

  renderer.render(scene, camera);

};


// const dissolve = (target) => {
//
//   let value = item;
//
//   console.log(item);
//
//   return value;
//
// };
