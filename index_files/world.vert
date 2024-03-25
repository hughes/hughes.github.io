
varying vec2 vUv;
varying vec3 vNormal;
uniform float time;

void main(){
    vUv=uv-vec2(time/32.,0.);
    vNormal=vec3(modelViewMatrix*vec4(normal,1.));

    gl_Position=projectionMatrix*
    modelViewMatrix*
    vec4(position,1.);
}