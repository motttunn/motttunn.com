(() => {



  let run;
  let startTime;
  let nowTime;
  let gl;
  let canvas;
  let canvasWidth;
  let canvasHeight;
  let prg;

  let sphereData;
  let sphereVBO;
  let sphereIBO;
  let sphereTexCoord;
  let texture;

  let mat4 = gl3.Math.Mat4;
  let qtn  = gl3.Math.Qtn;
  let wrapper;
  let threshold;
  let thresholdSlider;

  let mMatrix;
  let vMatrix;
  let pMatrix;
  let vpMatrix;
  let mvpMatrix;



  window.addEventListener('load', () => {

    canvas = document.getElementById('webgl_canvas');
    gl3.init(canvas);
    if(!gl3.ready){
      console.log('initialize error');
      return;
    }

    gl = gl3.gl;

    wrapper = new gl3.Gui.Wrapper();
    document.body.appendChild(wrapper.getElement());
    thresholdSlider = new gl3.Gui.Slider('threshold', threshold, 0.0, 1.0, 0.01);
    thresholdSlider.add('input', (eve, self) => {
      threshold = self.getValue();
    });
    wrapper.append(thresholdSlider.getElement());


    window.addEventListener('keydown', (eve) => {
      run = eve.key !== 'Escape';
    }, false);

    canvas.width  = canvasWidth  = window.innerWidth;
    canvas.height = canvasHeight = window.innerHeight;

    canvas.addEventListener('mousedown', mouseInteractionStart, false);
    canvas.addEventListener('mousemove', mouseInteractionMove, false);
    canvas.addEventListener('mouseup', mouseInteractionEnd, false);
    canvas.addEventListener('wheel', wheelScroll, false);

    loadShader();

  }, false);



  const loadShader = () => {

    prg = gl3.createProgramFromFile(
      './shader/main.vert',
      './shader/main.frag',
      ['position', 'normal', 'texCoord', 'color'],
      [3, 3, 2, 4],
      ['mvpMatrix', 'normalMatrix', 'textureUnit', 'threshold'],
      ['matrix4fv', 'matrix4fv', '1i', '1f'],
      loadTexture
    );

  }



  const loadTexture = () => {

    let img = new Image();

    img.addEventListener('load', () => {
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);
      initialize();
    }, false);

    img.src = 'mask.jpg';

  }



  const initialize = () => {

    sphereData = gl3.Mesh.sphere(64, 64, 1, [1.0, 1.0, 1.0, 1.0]);
    sphereVBO = [
      gl3.createVbo(sphereData.position),
      gl3.createVbo(sphereData.normal),
      gl3.createVbo(sphereData.texCoord),
      gl3.createVbo(sphereData.color)
    ];
    sphereIBO = gl3.createIbo(sphereData.index);

    mMatrix   = mat4.identity(mat4.create());
    vMatrix   = mat4.identity(mat4.create());
    pMatrix   = mat4.identity(mat4.create());
    vpMatrix  = mat4.identity(mat4.create());
    mvpMatrix = mat4.identity(mat4.create());
    normalMatrix = mat4.identity(mat4.create());

    gl.enable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    run = true;
    startTime = Date.now();
    nowTime = 0;

    render();

  }



  const render = () => {

    nowTime = (Date.now() - startTime) / 1000;

    if(run){requestAnimationFrame(render);}

    canvas.width  = canvasWidth  = window.innerWidth;
    canvas.height = canvasHeight = window.innerHeight;

    gl3.sceneView(0, 0, canvasWidth, canvasHeight);
    gl3.sceneClear([0.75, 0.75, 0.75, 1.0]);

    cameraUpdate();

    let aspect = canvasWidth / canvasHeight;
    mat4.lookAt(cameraPosition, centerPoint, cameraUpDirection, vMatrix);
    mat4.perspective(60, aspect, 0.1, cameraDistance * 2.0, pMatrix);
    mat4.multiply(pMatrix, vMatrix, vpMatrix);

    mat4.identity(mMatrix);
    mat4.rotate(mMatrix, nowTime * 0.75, [1.0, 1.0, 0.0], mMatrix);
    mat4.multiply(vpMatrix, mMatrix, mvpMatrix);
    mat4.transpose(mMatrix, normalMatrix);
    mat4.inverse(normalMatrix, normalMatrix);

    prg.useProgram();

    gl.cullFace(gl.FRONT);
    prg.pushShader([
      mvpMatrix,
      normalMatrix,
      0,
      threshold
    ]);
    prg.setAttribute(sphereVBO, sphereIBO);
    gl3.drawElements(gl3.gl.TRIANGLES, sphereData.index.length);

    gl.cullFace(gl.BACK);
    prg.pushShader([
      mvpMatrix,
      normalMatrix,
      0,
      threshold
    ]);
    prg.setAttribute(sphereVBO, sphereIBO);
    gl3.drawElements(gl3.gl.TRIANGLES, sphereData.index.length);

    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);

  }



  let cameraDistance     = 5.0;
  let cameraPosition     = [0.0, 0.0, cameraDistance];
  let centerPoint        = [0.0, 0.0, 0.0];
  let cameraUpDirection  = [0.0, 1.0, 0.0];
  let dCameraPosition    = [0.0, 0.0, cameraDistance];
  let dCenterPoint       = [0.0, 0.0, 0.0];
  let dCameraUpDirection = [0.0, 1.0, 0.0];
  let cameraRotateX      = 0.0;
  let cameraRotateY      = 0.0;
  let cameraScale        = 0.0;
  let clickStart         = false;
  let prevPosition       = [0, 0];
  let offsetPosition     = [0, 0];
  let qt  = qtn.identity(qtn.create());
  let qtx = qtn.identity(qtn.create());
  let qty = qtn.identity(qtn.create());
  function mouseInteractionStart(eve){
      clickStart = true;
      prevPosition = [
          eve.pageX,
          eve.pageY
      ];
      eve.preventDefault();
  }
  function mouseInteractionMove(eve){
      if(!clickStart){return;}
      let w = canvas.width;
      let h = canvas.height;
      let s = 1.0 / Math.min(w, h);
      offsetPosition = [
          eve.pageX - prevPosition[0],
          eve.pageY - prevPosition[1]
      ];
      prevPosition = [eve.pageX, eve.pageY];
      switch(eve.buttons){
          case 1:
              cameraRotateX += offsetPosition[0] * s;
              cameraRotateY += offsetPosition[1] * s;
              cameraRotateX = cameraRotateX % 1.0;
              cameraRotateY = Math.min(Math.max(cameraRotateY % 1.0, -0.25), 0.25);
              break;
      }
  }
  function mouseInteractionEnd(eve){
      clickStart = false;
  }
  function wheelScroll(eve){
      let w = eve.wheelDelta;
      if(w > 0){
          cameraScale = 0.8;
      }else if(w < 0){
          cameraScale = -0.8;
      }
  }
  function cameraUpdate(){
      let v = [1.0, 0.0, 0.0];
      cameraScale *= 0.75;
      cameraDistance += cameraScale;
      cameraDistance = Math.min(Math.max(cameraDistance, 5.0), 20.0);
      dCameraPosition[2] = cameraDistance;
      qtn.identity(qt);
      qtn.identity(qtx);
      qtn.identity(qty);
      qtn.rotate(cameraRotateX * gl3.PI2, [0.0, 1.0, 0.0], qtx);
      qtn.toVecIII(v, qtx, v);
      qtn.rotate(cameraRotateY * gl3.PI2, v, qty);
      qtn.multiply(qtx, qty, qt)
      qtn.toVecIII(dCameraPosition, qt, cameraPosition);
      qtn.toVecIII(dCameraUpDirection, qt, cameraUpDirection);
  }







})();
