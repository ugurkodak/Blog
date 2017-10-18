//var THREE = require("three");
//var Detector = require("./Detector");

//Navigation links
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
    //Setup scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.setZ(10);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Window resize
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //Mouse input
    var mouseDown = false;
    var clickPosition = new THREE.Vector3();
    document.onmousemove = function (e) {
        clickPosition.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0);
        clickPosition.unproject(camera);
        var dir = clickPosition.sub(camera.position).normalize();
        var distance = -camera.position.z / dir.z;
        clickPosition = camera.position.clone().add(dir.multiplyScalar(distance));
    }
    document.onmousedown = function (e) {
        mouseDown = true;
    }
    document.onmouseup = function (e) {
        mouseDown = false;
    }

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
    scene.add(starField);

    //Glowing objects
    const particleCount = 100;
    var glowingObject = new THREE.Object3D();
    var glowTexture = new THREE.TextureLoader().load("home/glow.png");
    var glowMaterial = new THREE.SpriteMaterial({
        map: glowTexture, 
        color: 0xff00ff
    });
    for (var i = 0; i < particleCount; i++) {
        var glowParticle = new THREE.Sprite(glowMaterial);
        glowParticle.position.x = THREE.Math.randFloatSpread(0.5);
        glowParticle.position.y = THREE.Math.randFloatSpread(0.5);
        glowParticle.position.z = THREE.Math.randFloatSpread(0.5);
        glowParticle.scale.set(0.5, 0.5, 1)
        glowingObject.add(glowParticle);
    }    
    glowingObject.position.setZ(0); //-1000
    scene.add(glowingObject);
    animate();
} else {
    //WebGL not available
    var warning = Detector.getWebGLErrorMessage();
    document.body.appendChild(warning);
}

function animate() {
    //Loop and render
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    //Animate stars
    starField.rotation.x += 0.0005;
    starField.rotation.y += 0.0005;

    //Animate glowing object
    for (var i = 0; i < glowingObject.children.length; i++) {
        var particlePosition = glowingObject.children[i].position;
        if (mouseDown) {
            particlePosition.x += (clickPosition.x - particlePosition.x) * 0.01;
            particlePosition.y += (clickPosition.y - particlePosition.y) * 0.01;
        }
        particlePosition.x += (Math.random() < 0.5 ? -1 : 1) * 0.01;
        particlePosition.y += (Math.random() < 0.5 ? -1 : 1) * 0.01;
        particlePosition.z += (Math.random() < 0.5 ? -1 : 1) * 0.01;
    }
    if (glowingObject.position.z < -1)
    glowingObject.position.z += Math.abs(glowingObject.position.z) * 0.06;

    //console.log(clickPosition);
}
