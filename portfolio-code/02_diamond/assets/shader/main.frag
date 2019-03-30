precision mediump float;
uniform mat4 uMatrixNormal;
uniform vec3 uPositionEye;
uniform bool uStatusSpecular;
uniform float uStrengthSpecular;
varying vec3 vPosition;
varying vec4 vColor;
varying vec3 vNormal;

const vec3 positionLight = normalize(vec3(1.0));
const vec3 positionView  = normalize(vec3(1.0));

void main() {

  vec3 convertedNormal = (uMatrixNormal * vec4(normalize(vNormal), 1.0)).xyz;

  vec3 positionEye   = normalize(vPosition - uPositionEye);
  vec3 reflectVector = reflect(positionEye, convertedNormal);
  vec3 baseVector    = normalize(reflectVector);
  float specular = max(dot(baseVector, positionLight), 0.0);
  specular = pow(specular, uStrengthSpecular);

  float diffusedLight = max(dot(convertedNormal, positionLight), 0.0);

  float transparent = 1.125 - (abs(dot(positionView, convertedNormal)));

  vec4 destColor = vColor * vec4(vec3(diffusedLight), transparent);

  if(uStatusSpecular == true){
    destColor.rgb += specular;
  }
  gl_FragColor = destColor;
}
