precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float waveIntensity;
uniform float waveFrequency;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;

    float bladeHeight = 1.0;
    float relativeHeight = aVertexPosition.y / bladeHeight;

    // Calculate the offset based on the wave function, scaled by relative height
    vec3 offset = vec3(
        waveIntensity * sin(waveFrequency * timeFactor - aVertexPosition.y) * relativeHeight,
        0.0,
        0.0
    );

    // Apply the offset to the vertex position
    vec4 displacedPosition = vec4(aVertexPosition + offset, 1.0);

    // Compute the final position of the vertex
    gl_Position = uPMatrix * uMVMatrix * displacedPosition;
}