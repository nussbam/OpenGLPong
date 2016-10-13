attribute vec2 aVertexPosition;
varying vec4 vColor;
attribute vec4 aColor;
uniform mat4 uModelViewMatrix;

void main() {

    vec4 position = vec4(aVertexPosition, 0.0, 1.0);
    gl_Position = uModelViewMatrix*position;
    vColor = aColor;
}