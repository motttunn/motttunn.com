attribute vec3 aPosition;
attribute vec4 aColor;
attribute vec3 aNormal;
uniform mat4 uMatrixMVP;
uniform mat4 uMatrixNormal;
varying vec4 vColor;
varying vec3 vNormal;
const vec3 lightPosition = normalize(vec3(1.0));
void main() {
  vec3 convertedNormal = (uMatrixNormal * vec4(aNormal, 0.0)).xyz;
  vNormal = (uMatrixNormal * vec4(aNormal, 0.0)).xyz;
  float diffusedLight  = max(dot(convertedNormal, lightPosition), 0.0);
  vColor = aColor * vec4(vec3(diffusedLight), 1.0);
  gl_Position = uMatrixMVP * vec4(aPosition, 1.0);
}
