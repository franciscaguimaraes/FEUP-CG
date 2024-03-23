attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float normScale;
uniform float timeFactor;

varying vec4 transformedPosition;

void main() {
    float offset = normScale * 0.1 * sin(timeFactor);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x + offset, aVertexPosition.y, aVertexPosition.z, 1.0);
    transformedPosition = gl_Position;
}
