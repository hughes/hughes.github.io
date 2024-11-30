uniform sampler2D texture1;
uniform sampler2D noise;
uniform float time;
uniform vec2 size;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDebug;

vec3 surface_material(float value, vec3 position) {
    float shore_width = fwidth(value) * 2.0;
    float shore_cutoff = 0.455;
    float land_cutoff = shore_cutoff - shore_width;

    vec3 ocean = vec3(0.05, 0.28, 0.38);
    vec3 land = vec3(0.00, 0.45, 0.35);
    vec3 shore = vec3(0.75, 0.75, 0.53);

    if (value > shore_cutoff) {
        return ocean;
    }
    if (value < land_cutoff) {
        return land;
    }
    return shore;
}

float noise_amount(vec2 uv) {
    vec2 scaled_uv = vec2(uv.x * 4.0, uv.y * 2.0);
    vec4 noise_sample = texture2D(noise, scaled_uv);
    return mix(0.8, 1.0, noise_sample.x);
}

float do_grid(float num_cells, float width, float location) {
    // return fwidth(location);
    float grid_dist = abs(fract(location * num_cells - 0.5) - 0.5) / pow(fwidth(location), 0.45);
    float grid_color = 1.0 - min(grid_dist, 1.0);
    return pow(grid_color, 1.0 / 2.2);
}

vec3 grid_material(vec2 uv) {
    float grid_width = 0.01;
    float grid_u = do_grid(36.0, grid_width / 2.0, uv.x);
    float grid_v = do_grid(24.0, grid_width, uv.y);
    float grid_value = max(grid_u, grid_v);

    return grid_value * vec3(0.03, 0.08, 0.09);
}

float fresnel(float I, float bias, float scale, float power) {
    return bias + scale * pow(I, power);
}


float render_alpha(vec2 screen_coord, vec3 normal) {
    float f = fresnel(length(normal.xy), 0.30, 1.0, 3.0);
    float space_scale = 880.0;
    float time_scale = 10.0;
    float bands = sin(screen_coord.y * space_scale + time * time_scale);
    float clamped_bands = clamp(bands, 0.0, 1.0);
    float lower_bound = 0.2;

    float falloff = 1.0; // - clamp(fresnel(length(normal.xy), 0.0, 3.5, 18.0), 0.0, 1.0);
    return falloff * clamp(f + max(clamped_bands, lower_bound), 0.0, 1.0);
}

float atmosphere_material(vec3 normal) {
    float f = fresnel(length(normal.xy), 0.2, 0.4, 8.0);
    // float f = 0.0;
    return f;
}

void main() {
    vec4 value = texture2D(texture1, vUv);
    vec3 surface = surface_material(value.x, vPosition) * noise_amount(vUv);
    vec3 grid = grid_material(vUv);
    float atmosphere = atmosphere_material(vNormal);
    vec3 color = surface + surface * atmosphere + 0.2 * atmosphere * atmosphere + grid;

    vec2 screen_coord = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y);
    float alpha = render_alpha(screen_coord, vNormal);
    gl_FragColor = vec4(color * alpha, 1.0);
    // gl_FragColor = vec4(color, alpha);
    // gl_FragColor = vec4(vec3(vDebug), 1.0);
    // gl_FragColor = vec4(grid, 1.0);
    // gl_FragColor = vec4(vec3(alpha), 1.0);
    // gl_FragColor = vec4(vec3(atmosphere), 1.0);
}