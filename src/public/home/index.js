//var THREE = require("three");
//var Detector = require("./Detector");

//TODO: Navigation links
code.onmouseover = function() {
    console.log("demo");
}
blog.onmouseover = function() {
    console.log("blog");
}
linkedin.onmouseover = function() {
    console.log("linkedin");
}
email.onmouseover = function() {
    console.log("email");
}

if (Detector.webgl) {
    var movementIterator = 0;

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
    camera.position.z = 5;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Add stars
    (function() {
	var starQty = 4500;
	var sGeometry = new THREE.SphereGeometry(1000, 100, 50);

	var materialOptions = {
	    size: 1.0,
	    transparency: true, 
	    opacity: 0.7
	};

	var starStuff = new THREE.PointCloudMaterial(materialOptions);

	for (var i = 0; i < starQty; i++) {		
	    var starVertex = new THREE.Vector3();
	    starVertex.x = Math.random() * 2000 - 1000;
	    starVertex.y = Math.random() * 2000 - 1000;
	    starVertex.z = Math.random() * 2000 - 1000;
	    sGeometry.vertices.push(starVertex);
	}

	stars = new THREE.PointCloud(sGeometry, starStuff);
	scene.add(stars);
    })();

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
    camera.position.y += 1;
    //camera.position.x += (mouseX - camera.position.x ) * 0.0005;
    //camera.position.y += (-mouseY - camera.position.y ) * 0.0005;
    camera.lookAt( scene.position );
    //sphere.rotation.x += 0.01;
    //sphere.rotation.y += 0.01;
    //spotLight.position.set(2000 * Math.cos(movementIterator), 2000 * Math.sin(movementIterator), 5);
    sphere.position.set(0.8 * Math.cos(movementIterator), 0.8 * Math.sin(movementIterator), 0);
    movementIterator += 0.01;
}
