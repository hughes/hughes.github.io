import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { MeshLine, MeshLineMaterial } from 'three.meshline';


import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// import Stats from 'three/addons/libs/stats.module.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
const params = {
    threshold: 0.508,
    strength: 0.861,
    radius: 0.86,
    exposure: 0.9253,
};

const WHERE_I_AM = { lat: 34.0, long: -118.4 }

// This is a basic asyncronous shader loader for THREE.js.
const loader = new THREE.FileLoader();

function ShaderLoader(vertex_url, fragment_url, onLoad, onProgress, onError) {
    loader.load(vertex_url, function (vertex_text) {
        loader.load(fragment_url, function (fragment_text) {
            onLoad(vertex_text, fragment_text);
        }, onProgress, onError);
    }, onProgress, onError);
}


// set the scene size
const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    VIEW_ANGLE = 65,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 100,
    FAR = 5000,
    RADIUS = 100;

const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
const scene = new THREE.Scene();

scene.add(camera);
camera.position.z = 400;
// renderer.setClearColor(0x070e0d);
renderer.setClearColor(0x033665e, 1.0);
renderer.setSize(WIDTH, HEIGHT);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping;

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.width = window.innerWidth;
    uniforms.height = window.innerHeight;
}

const container = document.getElementById('container');
container.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const uniforms = {
    time: { type: 'f', value: 0.0 },
    texture1: { type: 't', value: textureLoader.load('images/ocean_dist_resize.png') },
    noise: { type: 't', value: textureLoader.load('images/Noise_003.jpg') },
    size: { type: 'vec2', value: new THREE.Vector2() },
};

uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
uniforms.noise.value.wrapS = uniforms.noise.value.wrapT = THREE.RepeatWrapping;
uniforms.noise.value.repeat.set(4, 2);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;
renderer.toneMappingExposure = Math.pow(params.exposure, 4.0);


const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);

const outputPass = new OutputPass();
composer.addPass(renderPass);
composer.addPass(bloomPass);
composer.addPass(outputPass);


// const gui = new GUI();

// const bloomFolder = gui.addFolder('bloom');

// bloomFolder.add(params, 'threshold', 0.0, 1.0).onChange(function (value) {
//     bloomPass.threshold = Number(value);
// });

// bloomFolder.add(params, 'strength', 0.0, 3.0).onChange(function (value) {
//     bloomPass.strength = Number(value);
// });

// gui.add(params, 'radius', 0.0, 1.0).step(0.01).onChange(function (value) {
//     bloomPass.radius = Number(value);
// });

// const toneMappingFolder = gui.addFolder('tone mapping');
// toneMappingFolder.add(params, 'exposure', 0.1, 2).onChange(function (value) {
//     renderer.toneMappingExposure = Math.pow(value, 4.0);
// });

function circle(radius, offset = 0) {
    const points = [];
    const numPoints = 256;
    for (let i = 0; i <= numPoints + 1; i++) {
        const angle = i / numPoints * Math.PI * 2
        points.push(Math.sin(angle) * radius, Math.cos(angle) * radius, offset);
    }
    return points;
}

function start(textVShader, textFShader) {
    const geometry = new THREE.SphereGeometry(RADIUS, 256, 128);
    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: textVShader,
        fragmentShader: textFShader,
        transparent: true,
        side: THREE.DoubleSide,
        // dithering: true,
    });
    // material.blending = THREE.CustomBlending;
    // material.blendEquation = THREE.AddEquation;
    // material.blendSrc = THREE.SrcAlphaFactor;
    // material.blendDst = THREE.OneMinusSrcAlphaFactor;

    const earthMesh = new THREE.Mesh(geometry, material);
    scene.add(earthMesh);

    const circlePoints = circle(RADIUS * 1.2);
    const line = new MeshLine();
    line.setPoints(circlePoints);
    const lineMaterial = new MeshLineMaterial({
        color: 0xc2c4b1,
        dashArray: 0.025,
        // 0.5 -> balancing ; 0.1 -> more line : 0.9 -> more void
        dashRatio: 0.5,
        transparent: true,
        lineWidth: 1.5,
    });
    const dashLineMesh = new THREE.Mesh(line, lineMaterial)
    scene.add(dashLineMesh);

    const circlePoints2 = circle(RADIUS * 1.035);
    const line2 = new MeshLine();
    line2.setPoints(circlePoints2);
    const lineMaterial2 = new MeshLineMaterial({
        color: 0x71c2b7,
        // transparent: true,
        // opacity: 1.0,
        lineWidth: 2.5,
    });
    const lineMesh2 = new THREE.Mesh(line2, lineMaterial2);
    lineMesh2.position.z += 0.1;
    scene.add(lineMesh2);
    const lineMaterial3 = new MeshLineMaterial({
        color: 0x0a9f83,
        // transparent: true,
        // opacity: 1.0,
        lineWidth: 5,
    });
    scene.add(new THREE.Mesh(line2, lineMaterial3));

    const targetGeometry = new THREE.SphereGeometry(RADIUS / 15, 64, 32);
    const targetMaterial = new THREE.MeshBasicMaterial({
        color: 0xffaa7f,
        transparent: true,
        opacity: 0.25,
    })
    targetMaterial.blending = THREE.CustomBlending;
    targetMaterial.blendEquation = THREE.AddEquation;
    targetMaterial.blendSrc = THREE.SrcColorFactor;
    targetMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
    const targetMesh = new THREE.Mesh(targetGeometry, targetMaterial);
    const lat = WHERE_I_AM.lat * Math.PI / 180.0;
    const long = WHERE_I_AM.long * Math.PI / 180.0;
    targetMesh.position.x = Math.sin(long + Math.PI / 2) * RADIUS * Math.cos(lat);
    targetMesh.position.z = Math.cos(long + Math.PI / 2) * RADIUS * Math.cos(lat);
    targetMesh.position.y = RADIUS * Math.sin(lat);
    earthMesh.add(targetMesh);

    const startTime = new Date();

    function tick() {
        const now = new Date();
        const time = (now - startTime) / 1000.0;
        uniforms.time.value = time;
        renderer.getSize(uniforms.size.value);
        earthMesh.rotation.y = time * -0.3;
        earthMesh.rotation.x = 0.2;

        dashLineMesh.rotation.z = time * 0.03;
    }

    function render() {
        composer.render();
    }

    function step() {
        tick();
        render();
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

ShaderLoader('shaders/world.vert', 'shaders/world.frag', start);
