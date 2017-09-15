//var THREE = require("three");
//var Detector = require("./Detector");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(0.5, 32, 32);
var material = new THREE.MeshNormalMaterial();
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

    sphere.rotation.x += 0.01;
    //sphere.rotation.y += 0.01;

    sphere.position.x = 1 * Math.cos(movementIterator);
    sphere.position.y = 1 * Math.sin(movementIterator);
    movementIterator += 0.01;
}

if (Detector.webgl) {
    // Initiate function or other initializations here
    var movementIterator = 0;
    animate();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

//Window resize
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
