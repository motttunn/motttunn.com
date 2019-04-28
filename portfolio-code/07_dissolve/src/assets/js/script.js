import * as THREE from 'three';



let threshold = 0.5;
let sliderRange;
let sliderValue;

let camera;
let scene;
let light;
let renderer;

let sphereF;
let sphereB;
let sphereGeometry;
let sphereMaterial;

let shaderMaterial;
let shaderMaterialF;
let shaderMaterialB;
let shaderVertex;
let shaderFragment;



window.addEventListener('load', () => {

  getShader();

}, false);



const getShader = () => {

  let x = new XMLHttpRequest();
  x.onreadystatechange = function() {
    if (x.readyState == 4) {
      if (x.status == 200) {
        shaderVertex = x.responseText;
      }
    }
  }
  x.open('GET', './assets/shader/main.vert');
  x.send();

  let y = new XMLHttpRequest();
  y.onreadystatechange = function() {
    if (y.readyState == 4) {
      if (y.status == 200) {
        shaderFragment = y.responseText;
        if (shaderVertex != '' && shaderFragment != '') {
          init();
        }
      }
    }
  }
  y.open('GET', './assets/shader/main.frag');
  y.send();

};

const init = () => {

  sliderRange = document.getElementById('idx-Slider_Range');
  sliderValue = document.getElementById('idx-Slider_Text_Value');

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 16);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  light = new THREE.DirectionalLight(0xeeeeee, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0);
  document.body.appendChild(renderer.domElement);

  let loader = new THREE.TextureLoader();
  loader.load('./assets/images/mask.jpg', function(texture) {
    let uniforms = {
      'uColor': {type: 'c', value: new THREE.Color(0x00bfa5)},
      'uTexture': {type: 't', value: texture},
      'uThreshold': {type: 'f', value: threshold},
    }
    sphereGeometry = new THREE.SphereBufferGeometry(2, 32, 32);
    // shaderMaterial = new THREE.ShaderMaterial({
    //   uniforms: uniforms,
    //   vertexShader: shaderVertex,
    //   fragmentShader: shaderFragment,
    //   transparent : true,
    //   depthFunc: THREE.AlwaysDepth,
    //   blending: THREE.NormalBlending
    // });
    // shaderMaterialB      = shaderMaterial.clone();
    // shaderMaterialB.side = THREE.BackSide;
    // shaderMaterialF      = shaderMaterial.clone();
    // shaderMaterialF.side = THREE.FrontSide;
    shaderMaterialB = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shaderVertex,
      fragmentShader: shaderFragment,
      transparent : true,
      side: THREE.BackSide,
      depthFunc: THREE.AlwaysDepth,
      blending: THREE.NormalBlending
    });
    sphereB = new THREE.Mesh(sphereGeometry, shaderMaterialB);
    sphereB.material.needsUpdate = true;
    scene.add(sphereB);
    sliderRange.addEventListener('input', updateSlider(sliderRange, sliderValue, shaderMaterialB));
    shaderMaterialF = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shaderVertex,
      fragmentShader: shaderFragment,
      transparent : true,
      side: THREE.FrontSide,
      depthFunc: THREE.AlwaysDepth,
      blending: THREE.NormalBlending
    });
    sphereF = new THREE.Mesh(sphereGeometry, shaderMaterialF);
    sphereF.material.needsUpdate = true;
    scene.add(sphereF);
    sliderRange.addEventListener('input', updateSlider(sliderRange, sliderValue, shaderMaterialF));
    render();
  });

  window.addEventListener('resize', onWindowResize, false);

};

const updateSlider = (element, targetValue, targetMaterial) => {

  return (event) => {
    targetValue.innerText = element.value;
    targetMaterial.uniforms.uThreshold.value = element.value;
  }

};

const onWindowResize = () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

};



const render = () => {

  requestAnimationFrame(render);

  sphereF.rotation.y += 0.01;
  sphereB.rotation.y += 0.01;

  renderer.render(scene, camera);

};
