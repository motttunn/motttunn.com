precision mediump float;

varying vec3 vNormal;
varying vec2 vUv;

uniform vec3 uColor;
uniform sampler2D uTexture;
uniform float uThreshold;

const vec3 cLight = normalize(vec3(1.0));

void main(){

  vec4 samplerColor = texture2D(uTexture, vUv);

  float diffValue   = max(dot(normalize(vNormal), cLight), 0.0);
  float brightValue = samplerColor.r * 0.2 + samplerColor.g * 0.7 + samplerColor.b * 0.1;

  if (brightValue < uThreshold) {
    gl_FragColor = vec4(uColor, 1.0) * vec4(vec3(diffValue), 1.0);
  } else {
    gl_FragColor = vec4(vec3(1.0), 0.0);
  }

}
