
varying vec2 vUv;
varying vec3 vNormal;
// varying vec3 vPos;
uniform float time;

float rotation_period = 32.0;

void main() {
    vUv = uv + vec2(time / rotation_period, 0.0);
    vNormal = vec3(modelViewMatrix * vec4(normal, 1.0));

    gl_Position=projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}