import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { BloomPass } from 'three/addons/postprocessing/BloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';



import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
const params = {
    threshold: 0,
    strength: 1,
    radius: 0,
    exposure: 1
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
renderer.setSize(WIDTH, HEIGHT);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // optional with post-processing

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
    texture1: { type: 't', value: textureLoader.load('index_files/ocean_dist_resize.png') },
    noise: { type: 't', value: textureLoader.load('index_files/Noise_003.jpg') },
    size: { type: 'vec2', value: new THREE.Vector2() },
};

uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
uniforms.noise.value.wrapS = uniforms.noise.value.wrapT = THREE.RepeatWrapping;
uniforms.noise.value.repeat.set(4, 2);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);

composer.addPass(renderPass);

function circle(radius) {
    const geometry = new THREE.BufferGeometry();
    const position = [];
    const numPoints = 256;
    for (let i = 0; i < numPoints + 1; i++) {
        const angle = i / numPoints * Math.PI * 2
        position.push(Math.sin(angle) * radius, Math.cos(angle) * radius, 0);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));

    return geometry;
}

function start(textVShader, textFShader) {
    const geometry = new THREE.SphereGeometry(RADIUS, 256, 128);
    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: textVShader,
        fragmentShader: textFShader,
        transparent: true,
        side: THREE.DoubleSide,
    });
    material.blending = THREE.CustomBlending;
    material.blendEquation = THREE.AddEquation;
    material.blendSrc = THREE.SrcAlphaFactor;
    material.blendDst = THREE.OneMinusSrcAlphaFactor;

    const earthMesh = new THREE.Mesh(geometry, material);
    scene.add(earthMesh);

    const circlePoints = circle(RADIUS * 1.2);
    const line = new THREE.Line(circlePoints, new THREE.LineDashedMaterial({ color: 0xbfbf87, dashSize: 10, gapSize: 5 }));
    line.computeLineDistances();
    scene.add(line);

    const circlePoints2 = circle(RADIUS * 1.05);
    const line2 = new THREE.Line(circlePoints2, new THREE.LineBasicMaterial({
        color: 0xbfbf87,
        linewidth: 2,
    }));
    line2.computeLineDistances();
    scene.add(line2);

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

ShaderLoader('index_files/world.vert', 'index_files/world.frag', start);