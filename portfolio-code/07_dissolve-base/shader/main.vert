attribute vec3 position;
attribute vec3 normal;
attribute vec2 texCoord;
attribute vec4 color;

uniform mat4 mvpMatrix;
uniform mat4 normalMatrix;
varying vec3 vNormal;
varying vec4 vColor;
varying vec2 vTexCoord;



void main(){

    vColor = color;
    vTexCoord = texCoord;
    vNormal = (normalMatrix * vec4(normal, 0.0)).xyz;

    gl_Position = mvpMatrix * vec4(position, 1.0);

}
