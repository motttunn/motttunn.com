import { matIV, qtnIV } from './lib/minMatrixb.js';



/* ---------------------------------------------------------------------------
  VARIABLE
---------------------------------------------------------------------------- */
let gl;
let canvas;
let canvasWidth;
let canvasHeight;
let program;
let shaderData = [];
let aData = [];
let aLocation = [];
let aStride = [];
let uData = [];
let uLocation = [];
let position;
let color;
let normal;
let vertexPosition = [];
let vertexColor = [];
let vertexNormal = [];
let vertexIndex = [];
let faceNormal = [];
let indexLength;
let VBO;
let IBO;
let statusRun;
let timeStart;
let timeNow;

let m4;
let uMatrixM;
let uMatrixV;
let uMatrixP;
let uMatrixVP;
let uMatrixMVP;
let uMatrixNormal;

let uPositionEye      = [];
let uStatusSpecular   = true;
let uStrengthSpecular = 10.0;

let cameraDistance     = 12.5;
let cameraPosition     = [0.0, 0.0, cameraDistance];
let centerPosition     = [0.0, 0.0, 0.0];
let cameraUpDirection  = [0.0, 1.0, 0.0];
let dCameraPosition    = [0.0, 0.0, cameraDistance];
let dCenterPosition    = [0.0, 0.0, 0.0];
let dCameraUpDirection = [0.0, 1.0, 0.0];
let cameraRotateX      = 0.0;
let cameraRotateY      = 0.0;
let cameraScale        = 0.0;
let statusClick        = false;
let positionStart      = [];
let positionEnd        = [];
let qt4 = new qtnIV();
let qt  = qt4.identity(qt4.create());
let qtx = qt4.identity(qt4.create());
let qty = qt4.identity(qt4.create());



(() => {

  window.addEventListener('load', () => {

    canvas = document.getElementById('webgl_canvas');
    gl     = canvas.getContext('webgl');

    window.addEventListener('keydown', (event) => {
      statusRun = event.key !== 'Escape';
    }, false);

    canvas.width  = canvasWidth  = window.innerWidth;
    canvas.height = canvasHeight = window.innerHeight;

    canvas.addEventListener('mousedown', mouseInteractionStart, false);
    canvas.addEventListener('mousemove', mouseInteractionMove, false);
    canvas.addEventListener('mouseup', mouseInteractionEnd, false);
    canvas.addEventListener('wheel', wheelScroll, false);

    load();

  }, false);

  const load = () => {

    shaderData = loadNewShader('./assets/shader/main.vert', './assets/shader/main.frag');
    program = createNewProgram(shaderData[0], shaderData[1]);

    aData = [
      ['aPosition', 'aColor', 'aNormal'],
      [3, 4, 3]
    ];
    getNewLocation(program, 'a', aData, aLocation, aStride);

    uData = [
      ['uMatrixM', 'uMatrixMVP', 'uMatrixNormal', 'uPositionEye', 'uStatusSpecular', 'uStrengthSpecular'],
      ['matrix4fv', 'matrix4fv', 'matrix4fv', '3fv', '1i', '1f']
    ];
    getNewLocation(program, 'u', uData, uLocation);

    initialize();

  };

  const initialize = () => {

    vertexPosition.push(0.0,  1.0, 0.0);
    vertexPosition.push(0.0, -1.0, 0.0);
    vertexColor.push(0.25, 1.0, 1.0, 1.0);
    vertexColor.push(0.25, 1.0, 1.0, 1.0);

    (() => {
      const SPLIT  = 8;
      const DEGREE = 360 / SPLIT;
      const RADIAN = DEGREE * Math.PI / 180;
      for(let i = 0; i < SPLIT; ++i){
        let r = RADIAN * i;
        let s = Math.sin(r);
        let c = Math.cos(r);
        vertexPosition.push(s * 1.0, 1.0, c * 1.0);
        vertexPosition.push(s * 1.0, 1.0, c * 1.0);
        vertexColor.push(0.25, 1.0, 1.0, 1.0);
        vertexColor.push(0.25, 1.0, 1.0, 1.0);
        if(i === SPLIT - 1){
          vertexIndex.push(0, i * 2 + 2, 2);
        } else {
          vertexIndex.push(0, i * 2 + 2, i * 2 + 4);
        }
      }
      for(let j = 0; j < SPLIT; ++j){
        let r = RADIAN * j;
        let s = Math.sin(r);
        let c = Math.cos(r);
        vertexPosition.push(s * 1.25, 0.65, c * 1.25);
        vertexPosition.push(s * 1.25, 0.65, c * 1.25);
        vertexColor.push(0.25, 1.0, 1.0, 1.0);
        vertexColor.push(0.25, 1.0, 1.0, 1.0);
        if(j === 0){
          vertexIndex.push(1, SPLIT * 2 + j * 2 + 2, SPLIT * 2 * 2);
        } else {
          vertexIndex.push(1, SPLIT * 2 + j * 2 + 2, SPLIT * 2 + j * 2);
        }
      }
      for(let k = 0; k < SPLIT; ++k){
        let iN = k * 2 + 3;
        if(k === 0){
          vertexIndex.push(iN, SPLIT * 2 * 2 + 1, iN + SPLIT * 2);
        } else {
          vertexIndex.push(iN, iN + SPLIT * 2 - 2, iN + SPLIT * 2);
        }
      }
      for(let l = 0; l < SPLIT; ++l){
        let iN = l * 2 + 3;
        if(l === SPLIT - 1){
          vertexIndex.push(iN, iN + SPLIT * 2, 3);
        } else {
          vertexIndex.push(iN, iN + SPLIT * 2, iN + 2);
        }
      }
    })();

    (() => {
      for(let i = 0; i < vertexIndex.length / 3; i++){
        let faceN              = [];
        let positionBase   = getPosition(vertexPosition, vertexIndex[0 + 3 * i], vertexIndex[1 + 3 * i], vertexIndex[2 + 3 * i]);
        let positionStart  = positionBase[0];
        let positionMiddle = positionBase[1];
        let positionEnd    = positionBase[2];
        faceN = calculateNormalVector(
          calculateVectorDirection(positionStart, positionMiddle),
          calculateVectorDirection(positionEnd, positionMiddle)
        );
        faceN = normalizeVector(faceN, calculateVectorSize(faceN));
        faceNormal.push(faceN[0]);
        faceNormal.push(faceN[1]);
        faceNormal.push(faceN[2]);
      };
    })();

    (() => {
      for(let h = 0; h < vertexPosition.length / 3; h++){
        let vertexN = [0, 0, 0];
        for(let i = 0; i < vertexIndex.length; i++){
          if(vertexIndex[i] == h){
            if(i % 3 == 0){
              vertexN[0] += faceNormal[i];
              vertexN[1] += faceNormal[i+1];
              vertexN[2] += faceNormal[i+2];
            } else if (i % 3 == 1) {
              vertexN[0] += faceNormal[i-1];
              vertexN[1] += faceNormal[i];
              vertexN[2] += faceNormal[i+1];
            } else {
              vertexN[0] += faceNormal[i-2];
              vertexN[1] += faceNormal[i-1];
              vertexN[2] += faceNormal[i];
            }
          };
        };
        vertexN = normalizeVector(vertexN, calculateVectorSize(vertexN));
        vertexNormal.push(vertexN[0] * -1);
        vertexNormal.push(vertexN[1] * -1);
        vertexNormal.push(vertexN[2] * -1);
      };
    })();

    position = createNewVbo(vertexPosition);
    color    = createNewVbo(vertexColor);
    normal   = createNewVbo(vertexNormal);
    VBO      = [position, color, normal];
    IBO      = createNewIbo(vertexIndex);
    indexLength = vertexIndex.length;

    m4           = new matIV();
    uMatrixM      = m4.identity(m4.create());
    uMatrixV      = m4.identity(m4.create());
    uMatrixP      = m4.identity(m4.create());
    uMatrixVP     = m4.identity(m4.create());
    uMatrixMVP    = m4.identity(m4.create());
    uMatrixNormal = m4.identity(m4.create());

    gl.enable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.cullFace(gl.BACK);

    timeStart = Date.now();
    timeNow = 0;

    render();

  };

  const render = () => {

    setNewAttribute(VBO, aLocation, aStride);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);

    canvas.width  = canvasWidth  = window.innerWidth;
    canvas.height = canvasHeight = window.innerHeight;
    gl.viewport(0, 0, canvasWidth, canvasHeight);

    gl.clearColor(0, 0, 0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let cameraAspect = canvasWidth / canvasHeight;
    cameraUpdate();
    m4.lookAt(cameraPosition, centerPosition, cameraUpDirection, uMatrixV);
    m4.perspective(45, cameraAspect, 0.1, cameraDistance * 2.0, uMatrixP);
    m4.multiply(uMatrixP, uMatrixV, uMatrixVP);

    timeNow = (Date.now() - timeStart) / 1000;
    m4.identity(uMatrixM);
    m4.rotate(uMatrixM, timeNow * 0.75, [0.0, -1.0, 0.0], uMatrixM);
    m4.multiply(uMatrixVP, uMatrixM, uMatrixMVP);

    m4.transpose(uMatrixM, uMatrixNormal);
    m4.inverse(uMatrixNormal, uMatrixNormal);

    uPositionEye = cameraPosition;

    gl.uniformMatrix4fv(uLocation[0], false, uMatrixM);
    gl.uniformMatrix4fv(uLocation[1], false, uMatrixMVP);
    gl.uniformMatrix4fv(uLocation[2], false, uMatrixNormal);
    gl.uniform3fv(uLocation[3], uPositionEye);
    gl.uniform1i(uLocation[4], uStatusSpecular);
    gl.uniform1f(uLocation[5], uStrengthSpecular);

    gl.drawElements(gl.TRIANGLES, indexLength, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(render);

  };

})();



/* ---------------------------------------------------------------------------
  FUNCTION loadNewShader
---------------------------------------------------------------------------- */
const loadNewShader = (vertexPath, fragmentPath) => {

  let x              = new XMLHttpRequest();
  let shaderData     = [];
  let sourceVertex;
  let shaderVertex   = gl.createShader(gl.VERTEX_SHADER);
  let sourceFragment;
  let shaderFragment = gl.createShader(gl.FRAGMENT_SHADER);

  x.open('GET', vertexPath, false);
  x.onload = () => {
    sourceVertex = x.responseText;
  };
  x.send();
  x.open('GET', fragmentPath, false);
  x.onload = () => {
    sourceFragment = x.responseText;
  };
  x.send();

  gl.shaderSource(shaderVertex, sourceVertex);
  gl.compileShader(shaderVertex);
  shaderData.push(shaderVertex);
  gl.shaderSource(shaderFragment, sourceFragment);
  gl.compileShader(shaderFragment);
  shaderData.push(shaderFragment);

  if (gl.getShaderParameter(shaderVertex, gl.COMPILE_STATUS) && gl.getShaderParameter(shaderFragment, gl.COMPILE_STATUS)) {
    return shaderData;
  } else {
    console.log(gl.getShaderInfoLog(shaderVertex));
    console.log(gl.getShaderInfoLog(shaderFragment));
  }

};



/* ---------------------------------------------------------------------------
  FUNCTION createNewProgram
---------------------------------------------------------------------------- */
const createNewProgram = (vertexShader, fragmentShader) => {

  let program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.useProgram(program);
    return program;
  } else {
    return null;
  }

};



/* ---------------------------------------------------------------------------
  FUNCTION getNewLocation
---------------------------------------------------------------------------- */
const getNewLocation = (program, type, dataArray, locationArray, strideArray) => {

  switch (type) {
    case 'a':
      for(let i = 0; i < dataArray[0].length; ++i){
        locationArray[i] = gl.getAttribLocation(program, dataArray[0][i]);
        strideArray[i] = dataArray[1][i];
      }
      break;
    case 'u':
      for(let i = 0; i < dataArray[0].length; ++i){
        locationArray[i] = gl.getUniformLocation(program, dataArray[0][i]);
      }
      break;
  }

};


/* ---------------------------------------------------------------------------
    FUNCTION setNewAttribute
  ---------------------------------------------------------------------------- */
const setNewAttribute = (vbo, locationArray, strideArray) => {

  for (let i in vbo) {
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
    gl.enableVertexAttribArray(locationArray[i]);
    gl.vertexAttribPointer(locationArray[i], strideArray[i], gl.FLOAT, false, 0, 0);
  }

};



/* ---------------------------------------------------------------------------
  FUNCTION createNewVbo
---------------------------------------------------------------------------- */
const createNewVbo = (data) => {

  let vbo = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return vbo;

};



/* ---------------------------------------------------------------------------
  FUNCTION createNewIbo
---------------------------------------------------------------------------- */
const createNewIbo = (data) => {

  let ibo = gl.createBuffer();

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return ibo;

};



/* ---------------------------------------------------------------------------
  FUNCTION getPosition
---------------------------------------------------------------------------- */
const getPosition = (positionArray, positionNumber01, positionNumber02, positionNumber03) => {

  let position   = [];
  let position01 = [];
  let position02 = [];
  let position03 = [];

  for(let i = 0; i < 3; i++){
    position01.push(positionArray[positionNumber01 * 3 + i]);
  }
  for(let j = 0; j < 3; j++){
    position02.push(positionArray[positionNumber02 * 3 + j]);
  }
  for(let k = 0; k < 3; k++){
    position03.push(positionArray[positionNumber03 * 3 + k]);
  }

  position.push(position01);
  position.push(position02);
  position.push(position03);

  return position;

}



/* ---------------------------------------------------------------------------
  FUNCTION calculateVectorDirection
---------------------------------------------------------------------------- */
const calculateVectorDirection = (position01, position02) => {

  let vectorDirection = [];

  vectorDirection = [
    position02[0] - position01[0],
    position02[1] - position01[1],
    position02[2] - position01[2]
  ];

  return vectorDirection;

};



/* ---------------------------------------------------------------------------
  FUNCTION calculateVectorSize
---------------------------------------------------------------------------- */
const calculateVectorSize = (vector) => {

  let vectorSize;

  vectorSize = Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2);
  vectorSize = Math.sqrt(vectorSize);

  return vectorSize;

};



/* ---------------------------------------------------------------------------
  FUNCTION calculateNormalVector
---------------------------------------------------------------------------- */
const calculateNormalVector = (vector01, vector02) => {

  let normalVector = [];

  normalVector = [
    vector01[1] * vector02[2] - vector01[2] * vector02[1],
    vector01[2] * vector02[0] - vector01[0] * vector02[2],
    vector01[0] * vector02[1] - vector01[1] * vector02[0]
  ];

  return normalVector;

};



/* ---------------------------------------------------------------------------
  FUNCTION normalizeVector
---------------------------------------------------------------------------- */
const normalizeVector = (vectorDirection, vectorSize) => {

  let normalizeVector = [];

  normalizeVector = [
    vectorDirection[0] / vectorSize,
    vectorDirection[1] / vectorSize,
    vectorDirection[2] / vectorSize,
  ];

  return normalizeVector;

};



/* ---------------------------------------------------------------------------
  FUNCTION mouseInteractionStart
---------------------------------------------------------------------------- */
const mouseInteractionStart = (eve) => {
  statusClick = true;
  positionStart = [eve.pageX, eve.pageY];
  eve.preventDefault();
};



/* ---------------------------------------------------------------------------
  FUNCTION mouseInteractionMove
---------------------------------------------------------------------------- */
const mouseInteractionMove = (eve) => {
  if (!statusClick) {
    return;
  }
  let w = canvas.width;
  let h = canvas.height;
  let s = 1.0 / Math.min(w, h);
  positionEnd = [eve.pageX - positionStart[0], eve.pageY - positionStart[1]];
  positionStart = [eve.pageX, eve.pageY];
  switch (eve.buttons) {
    case 1:
      cameraRotateX += positionEnd[0] * s;
      cameraRotateY += positionEnd[1] * s;
      cameraRotateX = cameraRotateX % 1.0;
      cameraRotateY = Math.min(Math.max(cameraRotateY % 1.0, -0.25), 0.25);
      break;
  }
};



/* ---------------------------------------------------------------------------
  FUNCTION mouseInteractionEnd
---------------------------------------------------------------------------- */
const mouseInteractionEnd = () => {
  statusClick = false;
};



/* ---------------------------------------------------------------------------
  FUNCTION wheelScroll
---------------------------------------------------------------------------- */
const wheelScroll = (eve) => {
  let w = eve.wheelDelta;
  if (w > 0) {
    cameraScale = 0.8;
  } else if (w < 0) {
    cameraScale = -0.8;
  }
};



/* ---------------------------------------------------------------------------
  FUNCTION cameraUpdate
---------------------------------------------------------------------------- */
const cameraUpdate = () => {
  let v = [1.0, 0.0, 0.0];
  cameraScale *= 0.75;
  cameraDistance += cameraScale;
  cameraDistance = Math.min(Math.max(cameraDistance, 5.0), 20.0);
  dCameraPosition[2] = cameraDistance;
  qt4.identity(qt);
  qt4.identity(qtx);
  qt4.identity(qty);
  qt4.rotate(cameraRotateX * Math.PI * 2, [0.0, 1.0, 0.0], qtx);
  qt4.toVecIII(v, qtx, v);
  qt4.rotate(cameraRotateY * Math.PI * 2, v, qty);
  qt4.multiply(qtx, qty, qt);
  qt4.toVecIII(dCameraPosition, qt, cameraPosition);
  qt4.toVecIII(dCameraUpDirection, qt, cameraUpDirection);
};
