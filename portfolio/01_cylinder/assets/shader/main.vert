attribute vec3 aPosition;
attribute vec4 aColor;
attribute vec3 aNormal;
uniform mat4 matrixMVP;
varying vec4 vColor;
const vec3 light = normalize(vec3(1.0));
void main() {
float diffuse = max(dot(aNormal, light), 0.0);
  vColor = aColor * vec4(vec3(diffuse), 1.0);
  gl_Position = matrixMVP * vec4(aPosition, 1.0);
}
