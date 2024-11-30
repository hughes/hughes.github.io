
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDebug;
uniform float time;

float rotation_period = 32.0;

float rand(float seed){
    return fract(sin(seed * 12.9898) * 43758.5453);
}

void main() {
    vUv = uv;
    vNormal = vec3(modelViewMatrix * vec4(normal, 1.0));

    vec3 offset = vec3(0.0);

    float spatial_freq = 62.0;
    float time_freq = 67.0;
    float buzz = sin(position.y * spatial_freq + time * time_freq + rand(time - fract(time)));
    float buzz_intensity = 0.9;

    float intensity_spike = 0.3 + pow(abs(sin(time + rand(time - fract(time)) * time)), 1000.0) * 10.0 * sin(time * 2.3);
    // vDebug = pow(abs(sin(time + rand(time - fract(time)) * time)), 1000.0);
    vDebug = intensity_spike;
    offset.x = buzz * buzz_intensity * intensity_spike;

    vPosition = position + offset;
    gl_Position=projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}