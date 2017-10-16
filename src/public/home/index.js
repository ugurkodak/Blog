//var THREE = require("three");
//var Detector = require("./Detector");

//TODO: Navigation links
// code.onmouseover = function() {
//     console.log("demo");
// }
// blog.onmouseover = function() {
//     console.log("blog");
// }
// linkedin.onmouseover = function() {
//     console.log("linkedin");
// }
// email.onmouseover = function() {
//     console.log("email");
// }

if (Detector.webgl) {
    //Mouse input
    var mouseX = 0;
    var mouseY = 0;
    var mouseDown = false;
    document.onmousemove = function(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
    }
    document.onmousedown = function(e) {
	mouseDown = true;
    }
    document.onmouseup = function(e) {
	mouseDown = false;
    }

    //Setup scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Add stars
    var starsGeometry = new THREE.Geometry();
    for (var i = 0; i < 10000; i++) {
        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread(2000);
        star.y = THREE.Math.randFloatSpread(2000);
        star.z = THREE.Math.randFloatSpread(2000);
        starsGeometry.vertices.push(star);
    }
    var starsMaterial = new THREE.PointsMaterial({ 
        color: 0xffffff 
    });
    var starField = new THREE.Points(starsGeometry, starsMaterial);
    starField.position.z = -1000;
    scene.add( starField );

    //Sphere
    var sphereSpeed = 0;
    var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    var material = new THREE.MeshStandardMaterial();
    var sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    var spotLight = new THREE.SpotLight(0xff00ff, 1);
    spotLight.position.set(0, 0, 100);
    scene.add(spotLight);

    var ambientLight = new THREE.AmbientLight(0xff0000, 0.5);
    spotLight.position.set(0, 0, 2);
    scene.add(ambientLight);

    //Window resize
    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
    }
    
    animate();
} else {
    //WebGL not available
    var warning = Detector.getWebGLErrorMessage();
    document.body.appendChild(warning);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    
    starField.rotation.x += 0.0005;
    starField.rotation.y += 0.0005;
    //spotLight.position.set(2000 * Math.cos(movementIterator), 2000 * Math.sin(movementIterator), 5);
    sphere.position.set(0.8 * Math.cos(sphereSpeed), 0.8 * Math.sin(sphereSpeed), 0);
    sphereSpeed += 0.01;
}
