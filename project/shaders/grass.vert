precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D bumpMap;
uniform float waveIntensity;
uniform float waveFrequency;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;

    vec3 offset = vec3(
        waveIntensity * sin(waveFrequency) * timeFactor * aVertexPosition.y,
        0.0,
        waveIntensity * cos(waveFrequency) * timeFactor * aVertexPosition.y
    );

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}