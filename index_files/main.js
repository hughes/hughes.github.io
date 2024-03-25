// This is a basic asyncronous shader loader for THREE.js.
function ShaderLoader(vertex_url, fragment_url, onLoad, onProgress, onError) {
    var vertex_loader = new THREE.XHRLoader(THREE.DefaultLoadingManager);
    vertex_loader.setResponseType('text');
    vertex_loader.load(vertex_url, function (vertex_text) {
        var fragment_loader = new THREE.XHRLoader(THREE.DefaultLoadingManager);
        fragment_loader.setResponseType('text');
        fragment_loader.load(fragment_url, function (fragment_text) {
            onLoad(vertex_text, fragment_text);
        });
    }, onProgress, onError);
}


// set the scene size
const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 200,
    FAR = 500,
    RADIUS = 100;

const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
const scene = new THREE.Scene();

scene.add(camera);
camera.position.z = 300;
renderer.setSize(WIDTH, HEIGHT);

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

const uniforms = {
    time: { type: 'f', value: 0.0 },
    texture1: { type: 't', value: THREE.ImageUtils.loadTexture('index_files/ocean_dist_resize.png') },
    cutoff: { type: 'f', value: 0.456887065393 },
    width: { type: 'f', value: WIDTH },
    height: { type: 'f', value: HEIGHT },
};

uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;


function buildScene(textVShader, textFShader) {


    const geometry = new THREE.SphereGeometry(RADIUS, 128, 64);
    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: textVShader,
        fragmentShader: textFShader
    });

    const earthMesh = new THREE.Mesh(geometry, material);
    scene.add(earthMesh);

    const startTime = new Date();

    function tick() {
        const now = new Date();
        const dt = (now - startTime) / 1000.0;
        uniforms.time.value = dt;
    }

    function render() {
        renderer.render(scene, camera);
    }

    function step() {
        tick();
        render();
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

ShaderLoader('index_files/world.vert', 'index_files/world.frag', buildScene);