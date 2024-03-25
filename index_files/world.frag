
uniform sampler2D texture1;
uniform float cutoff;
uniform float time;
uniform float width;
uniform float height;
varying vec2 vUv;
varying vec3 vNormal;
float trace=.008;
float land_trace=.1;
vec3 cool_green=vec3(.3,1.,.4);

float dot_dist(vec2 n_dots){
    vec2 tmp=vec2(vUv.x*n_dots.x,vUv.y*n_dots.y);
    return sin(tmp.x)*sin(tmp.x)+sin(tmp.y)*sin(tmp.y);
}

vec3 render_land(float dist){
    float tmp=dot_dist(vec2(500.,250.))-1.;
    return cool_green*tmp*tmp*gl_FragCoord.z;
    //return vec3(gl_FragCoord.z);
}

vec3 render_coast(float dist){
    float val=1.-(dist-(cutoff-trace))/(1.-(cutoff-trace))*50.;
    return max(0.,val)*cool_green;
}

vec3 render_sea(float dist){
    return vec3(0.);
}

void main(){
    float norm_magnitude=length(vec2(vNormal));
    float edge_color=pow(norm_magnitude,30.)*8.;
    vec4 sample=texture2D(texture1,vUv);

    if(sample.r>cutoff+trace){
        sample.rgb=render_sea(sample.r);
    }else if(sample.r>cutoff-trace){
        sample.rgb=render_coast(sample.r);
    }else{
        sample.rgb=render_land(sample.r);
    }
    sample.rgb+=edge_color*cool_green;
    gl_FragColor=sample;
}