attribute vec3 aPosition;
attribute vec4 aColor;
attribute vec3 aNormal;
uniform mat4 uMatrixM;
uniform mat4 uMatrixMVP;
varying vec3 vPosition;
varying vec4 vColor;
varying vec3 vNormal;

void main() {
  vPosition   = (uMatrixM * vec4(aPosition, 1.0)).xyz;
  vColor      = aColor;
  vNormal     = aNormal;
  gl_Position = uMatrixMVP * vec4(aPosition, 1.0);
}
