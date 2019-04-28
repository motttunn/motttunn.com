precision mediump float;

uniform sampler2D textureUnit;
uniform float threshold;

varying vec3 vNormal;
varying vec4 vColor;
varying vec2 vTexCoord;

const vec3 light = normalize(vec3(1.0));



void main(){

    vec4 samplerColor = texture2D(textureUnit, vTexCoord);
    float diff = max(dot(normalize(vNormal), light), 0.0);
    float bright = samplerColor.r * 0.2 + samplerColor.g * 0.7 + samplerColor.b * 0.1;

    if(bright < threshold) {
      // gl_FragColor = vColor * samplerColor;
      gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0) * vec4(vec3(diff), 1.0);
    } else {
      gl_FragColor = vec4(vec3(1.0), 0.0);
    }
}
