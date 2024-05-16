#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D bumpMap;

void main() {
    vec4 texColor = texture2D(uSampler, vTextureCoord);    
    gl_FragColor = texColor;
}