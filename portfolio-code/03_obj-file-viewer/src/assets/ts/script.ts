import { matIV, qtnIV } from '../js/lib/minMatrixb.js';
import { objsonConvert } from '../js/lib/objson.js';

// declare function require(x: string): any;
declare let jQuery: any;

export {};

(() => {
  let jsStart = document.getElementById('js-Start') as HTMLInputElement;
  let jsStartButton = document.getElementById(
    'js-Start_Button')as HTMLInputElement;
  let jsForm = document.getElementById('js-Form') as HTMLInputElement;
  let jsFormButton = document.getElementById(
    'js-Form_Button') as HTMLInputElement;
  jsStartButton.addEventListener('click', () => {
    jsStart.classList.add('idx-Start-Hidden');
    jsForm.classList.remove('st-Form-Hidden');
  }, false);

  /* ---------------------------------------------------------------------------
    VARIABLE
  ---------------------------------------------------------------------------- */
  let canvas: any;
  let canvasWidth: number;
  let canvasHeight: number;
  let gl: any;
  let obj: any;
  let position: any;
  let normal: any;
  let texCoord: any;
  let texCoordFix: number[] = [];
  let index: any;
  let indexLength: number;
  let bufferList: any[];
  let texture: any;
  let textureSrc: any;
  let textureUnit: number = 0;
  let aLocation: any[] = [];
  let aStride: number[] = [];
  let uLocation: any[] = [];
  let eyePosition: number[];
  let skyDirection: number[];
  let lightDirection: number[];
  let skyColor: number[];
  let groundColor: number[];
  let time: number;
  let startTime: number;
  let count: number;
  let objFlag: boolean = false;
  let imgFlag: boolean = false;

  /* ---------------------------------------------------------------------------
    VARIABLE matrix
  ---------------------------------------------------------------------------- */
  let m4: any;
  let mMatrix: any;
  let vMatrix: any;
  let pMatrix: any;
  let vpMatrix: any;
  let mvpMatrix: any;
  let invMatrix: any;
  let norMatrix: any;

  /* ---------------------------------------------------------------------------
    VARIABLE camera
  ---------------------------------------------------------------------------- */
  let cameraDistance: number = 500.0;
  let cameraPosition: number[] = [0.0, 0.0, cameraDistance];
  let centerPosition: number[] = [0.0, 0.0, 0.0];
  let cameraUpDirection: number[] = [0.0, 1.0, 0.0];
  let dCameraPosition: number[] = [0.0, 0.0, cameraDistance];
  let dCenterPosition: number[] = [0.0, 0.0, 0.0];
  let dCameraUpDirection: number[] = [0.0, 1.0, 0.0];
  let cameraRotateX: number = 0.0;
  let cameraRotateY: number = 0.0;
  let cameraScale: number = 0.0;
  let clickWhile: boolean = false;
  let startPosition: number[] = [];
  let endPosition: number[] = [];
  let qt4: any = new qtnIV();
  let qt: any = qt4.identity(qt4.create());
  let qtx: any = qt4.identity(qt4.create());
  let qty: any = qt4.identity(qt4.create());

  window.addEventListener('load', () => {

    canvas = document.getElementById('screen');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gl = canvas.getContext('webgl');

    canvas.addEventListener('mousedown', mouseInteractionStart, false);
    canvas.addEventListener('mousemove', mouseInteractionMove, false);
    canvas.addEventListener('mouseup', mouseInteractionEnd, false);
    canvas.addEventListener('wheel', wheelScroll, false);

    let program: any = createNewProgram(
      createNewShader('main_vs'),
      createNewShader('main_fs')
    );

    aLocation[0] = gl.getAttribLocation(program, 'position');
    aLocation[1] = gl.getAttribLocation(program, 'normal');
    aLocation[2] = gl.getAttribLocation(program, 'texCoord');

    aStride[0] = 3;
    aStride[1] = 3;
    aStride[2] = 2;

    uLocation[0] = gl.getUniformLocation(program, 'mMatrix');
    uLocation[1] = gl.getUniformLocation(program, 'mvpMatrix');
    uLocation[2] = gl.getUniformLocation(program, 'invMatrix');
    uLocation[3] = gl.getUniformLocation(program, 'norMatrix');
    uLocation[4] = gl.getUniformLocation(program, 'textureUnit');
    uLocation[5] = gl.getUniformLocation(program, 'skyDirection');
    uLocation[6] = gl.getUniformLocation(program, 'lightDirection');
    uLocation[7] = gl.getUniformLocation(program, 'eyePosition');
    uLocation[8] = gl.getUniformLocation(program, 'skyColor');
    uLocation[9] = gl.getUniformLocation(program, 'groudColor');

    let form: any;
    form = document.forms.configForm as HTMLCollectionOf<HTMLFormElement>;
    form.objFormInput.addEventListener('change', eve => {
      let formResult = eve.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsText(formResult);
      fileReader.addEventListener('load', () => {
        console.log(objsonConvert(fileReader.result));
        obj = JSON.parse(objsonConvert(fileReader.result));
        objFlag = true;
        for (let i = 0; i < obj.texCoord.length; i++) {
          if (i % 2 === 0) {
            texCoordFix[i] = obj.texCoord[i];
          } else {
            obj.texCoord[i] = 1 - obj.texCoord[i];
            texCoordFix[i] = obj.texCoord[i];
          }
        }
        console.log(obj.texCoord);
        console.log(texCoordFix);
      });
    });
    form.imgFormInput.addEventListener('change', eve => {
      let formResult = eve.target.files[0];
      let img = new Image();
      img.addEventListener('load', () => {
        texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
      }, false);
      URL.revokeObjectURL(img.src);
      img.src = URL.createObjectURL(formResult);
      imgFlag = true;
    });
    jsFormButton.addEventListener('click', () => {
      if (objFlag === true && imgFlag === true) {
        initialize();
        jsForm.classList.add('st-Form-Hidden');
      }
    }, false);

  }, false);

  // const loadTexture = () => {
  //   let img = new Image();
  //   img.addEventListener('load', () => {
  //     texture = gl.createTexture();
  //     gl.bindTexture(gl.TEXTURE_2D, texture);
  //     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  //     gl.generateMipmap(gl.TEXTURE_2D);
  //     gl.bindTexture(gl.TEXTURE_2D, null);
  //   }, false);
  //   img.src = textureSrc;
  //   initialize();
  // };

  const initialize = () => {

    position = createNewVbo(obj.position);
    normal = createNewVbo(obj.normal);
    texCoord = createNewVbo(texCoordFix);
    index = createNewIbo(obj.index);
    indexLength = obj.index.length;
    bufferList = [position, normal, texCoord];

    m4 = new matIV();
    mMatrix = m4.identity(m4.create());
    vMatrix = m4.identity(m4.create());
    pMatrix = m4.identity(m4.create());
    vpMatrix = m4.identity(m4.create());
    mvpMatrix = m4.identity(m4.create());
    invMatrix = m4.identity(m4.create());
    norMatrix = m4.identity(m4.create());

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    eyePosition = [0.0, 0.0, 20.0];

    skyDirection = [0.0, 1.0, 0.0];
    lightDirection = [-0.55, 0.55, 0.55];
    skyColor = [0.828, 0.864, 0.88, 1.0];
    groundColor = [0.5, 0.5, 0.5, 1.0];

    time = 0;
    startTime = Date.now();
    count = 0;

    render();
  };

  const render = () => {
    count++;

    setNewAttribute(bufferList, aLocation, aStride);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);

    canvas.width = canvasWidth = window.innerWidth;
    canvas.height = canvasHeight = window.innerHeight;
    gl.viewport(0, 0, canvasWidth, canvasHeight);
    let cameraAspect: number = canvasWidth / canvasHeight;

    gl.clearColor(0.828, 0.864, 0.88, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    cameraUpdate();
    m4.lookAt(cameraPosition, centerPosition, cameraUpDirection, vMatrix);
    m4.perspective(45, cameraAspect, 0.1, cameraDistance * 2.0, pMatrix);
    m4.multiply(pMatrix, vMatrix, vpMatrix);

    time = (Date.now() - startTime) / 1000;
    m4.identity(mMatrix);
    m4.translate(mMatrix, [0.0, -5.0, 0.0], mMatrix);
    // m4.rotate(mMatrix, Math.PI * 0.5, [0.0, -1.0, 0.0625], mMatrix);
    m4.rotate(mMatrix, Math.PI * 0.5, [0.0, -1.0, 0], mMatrix);
    m4.rotate(mMatrix, time * 0.125, [0.0, -1.0, 0.0], mMatrix);
    m4.multiply(vpMatrix, mMatrix, mvpMatrix);

    m4.inverse(mMatrix, invMatrix);

    m4.transpose(mMatrix, norMatrix);
    m4.inverse(norMatrix, norMatrix);

    gl.uniformMatrix4fv(uLocation[0], false, mMatrix);
    gl.uniformMatrix4fv(uLocation[1], false, mvpMatrix);
    gl.uniformMatrix4fv(uLocation[2], false, invMatrix);
    gl.uniformMatrix4fv(uLocation[3], false, norMatrix);
    gl.uniform1i(uLocation[4], textureUnit);
    gl.uniform3fv(uLocation[5], skyDirection);
    gl.uniform3fv(uLocation[6], lightDirection);
    gl.uniform3fv(uLocation[7], eyePosition);
    gl.uniform4fv(uLocation[8], skyColor);
    gl.uniform4fv(uLocation[9], groundColor);

    gl.drawElements(gl.TRIANGLES, indexLength, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(render);
  };

  /* ---------------------------------------------------------------------------
    FUNCTION loadObj
  ---------------------------------------------------------------------------- */
  // const loadObj = (file: string): void => {
  //   let x: any = new XMLHttpRequest();
  //   x.open('GET', file);
  //   x.onreadystatechange = function() {
  //     if (x.readyState === 4) {
  //       obj = JSON.parse(objsonConvert(x.responseText));
  //       initialize();
  //       // loadTexture();
  //     }
  //   };
  //   x.send();
  // };

  /* ---------------------------------------------------------------------------
    FUNCTION loadTexture
  ---------------------------------------------------------------------------- */
  // const loadTexture = () => {
  //   let image: any = new Image();
  //   image.addEventListener(
  //     'load',
  //     () => {
  //       texture = gl.createTexture();
  //       gl.bindTexture(gl.TEXTURE_2D, texture);
  //       gl.texImage2D(
  //         gl.TEXTURE_2D,
  //         0,
  //         gl.RGBA,
  //         gl.RGBA,
  //         gl.UNSIGNED_BYTE,
  //         image
  //       );
  //       gl.generateMipmap(gl.TEXTURE_2D);
  //       gl.bindTexture(gl.TEXTURE_2D, null);
  //       initialize();
  //     },
  //     false
  //   );
  //   image.src = 'image/Dolphin_BaseColor.png';
  // };

  /* ---------------------------------------------------------------------------
    FUNCTION createNewShader
  ---------------------------------------------------------------------------- */
  const createNewShader = (id: string): void => {
    let shader;

    let scriptElement = document.getElementById(id) as HTMLInputElement;
    if (!scriptElement) {
      return;
    }

    switch (scriptElement.type) {
      case 'x-shader/x-vertex':
        shader = gl.createShader(gl.VERTEX_SHADER);
        break;
      case 'x-shader/x-fragment':
        shader = gl.createShader(gl.FRAGMENT_SHADER);
        break;
      default:
        return;
    }

    gl.shaderSource(shader, scriptElement.innerText);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    } else {
      console.log(gl.getShaderInfoLog(shader));
    }
  };

  /* ---------------------------------------------------------------------------
    FUNCTION createNewProgram
  ---------------------------------------------------------------------------- */
  const createNewProgram = (vs: any, fs: any): any | null => {
    let program: any = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.useProgram(program);
      return program;
    } else {
      return null;
    }
  };

  /* ---------------------------------------------------------------------------
    FUNCTION setNewAttribute
  ---------------------------------------------------------------------------- */
  const setNewAttribute = (
    vbo: number[],
    aLocation: string[],
    aStride: number[]
  ): void => {
    for (let i in vbo) {
      // バッファをバインドする
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
      // attributeLocationを有効にする
      gl.enableVertexAttribArray(aLocation[i]);
      // attributeLocationを通知し登録する
      gl.vertexAttribPointer(aLocation[i], aStride[i], gl.FLOAT, false, 0, 0);
    }
  };

  /* ---------------------------------------------------------------------------
    FUNCTION createNewVbo
  ---------------------------------------------------------------------------- */
  const createNewVbo = (data: number[]): void => {
    // バッファオブジェクトの生成
    let vbo = gl.createBuffer();
    // バッファをバインドする
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    // バッファにデータをセット
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    // バッファのバインドを無効化
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // 生成した VBO を返す
    return vbo;
  };

  /* ---------------------------------------------------------------------------
    FUNCTION createNewIbo
  ---------------------------------------------------------------------------- */
  const createNewIbo = (data: number[]): void => {
    // バッファオブジェクトの生成
    let ibo = gl.createBuffer();
    // バッファをバインドする
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    // バッファにデータをセット
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Int16Array(data),
      gl.STATIC_DRAW
    );
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
    // バッファのバインドを無効化
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    // 生成した IBO を返す
    return ibo;
  };

  /* ---------------------------------------------------------------------------
    FUNCTION mouseInteractionStart
  ---------------------------------------------------------------------------- */
  const mouseInteractionStart = eve => {
    clickWhile = true;
    startPosition = [eve.pageX, eve.pageY];
    eve.preventDefault();
  };

  /* ---------------------------------------------------------------------------
    FUNCTION mouseInteractionMove
  ---------------------------------------------------------------------------- */
  const mouseInteractionMove = eve => {
    if (!clickWhile) {
      return;
    }
    let w: number = canvas.width;
    let h: number = canvas.height;
    let s: number = 1.0 / Math.min(w, h);
    endPosition = [eve.pageX - startPosition[0], eve.pageY - startPosition[1]];
    startPosition = [eve.pageX, eve.pageY];
    switch (eve.buttons) {
      case 1:
        cameraRotateX += endPosition[0] * s;
        cameraRotateY += endPosition[1] * s;
        cameraRotateX = cameraRotateX % 1.0;
        cameraRotateY = Math.min(Math.max(cameraRotateY % 1.0, -0.25), 0.25);
        break;
    }
  };

  /* ---------------------------------------------------------------------------
    FUNCTION mouseInteractionEnd
  ---------------------------------------------------------------------------- */
  const mouseInteractionEnd = () => {
    clickWhile = false;
  };

  /* ---------------------------------------------------------------------------
    FUNCTION wheelScroll
  ---------------------------------------------------------------------------- */
  const wheelScroll = eve => {
    let w: number = eve.wheelDelta;
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
})();
