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

var ambient = new Audio("home/ambient.ogg");

let muted = true;
volume.onclick = function() {
    if (muted) {
        muted = false;
        volumeOn.style.display = "inline";
        volumeOff.style.display = "none";
        ambient.play();
    }
    else {
        muted = true;
        volumeOn.style.display = "none";
        volumeOff.style.display = "inline";
        ambient.pause();
    }
}

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
    var mousePosition = new THREE.Vector3();
    document.onmousemove = function (e) {
        mousePosition.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0);
        mousePosition.unproject(camera);
        var dir = mousePosition.sub(camera.position).normalize();
        var distance = -camera.position.z / dir.z;
        mousePosition = camera.position.clone().add(dir.multiplyScalar(distance));
    }
    document.onmousedown = function (e) {
        mouseDown = true;
    }
    document.onmouseup = function (e) {
        mouseDown = false;
    }

    //Clock
    var clock = new THREE.Clock();

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

    //Glowing object
    var glowingObject = new THREE.Object3D();
    var glowTexture = new THREE.TextureLoader().load("home/glow.png");
    var glowMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xff00ff
    });
    const particleCount = 200;
    var particleScale = 0.5;
    const particleSpeed = 0.01;
    for (var i = 0; i < particleCount; i++) {
        var glowParticle = new THREE.Sprite(glowMaterial);
        glowParticle.position.x = THREE.Math.randFloatSpread(particleScale + 0.5);
        glowParticle.position.y = THREE.Math.randFloatSpread(particleScale + 0.5);
        glowParticle.position.z = THREE.Math.randFloatSpread(particleScale + 0.5);
        glowParticle.scale.set(particleScale, particleScale, 1);
        glowParticle.userData = {
            velocity: new THREE.Vector3(
            (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.01,
            (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.01,
            (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.01
        )};
        glowingObject.add(glowParticle);
    }
    scene.add(glowingObject);

    animate();
} else {
    // var warning = Detector.getWebGLErrorMessage();
    // document.body.appendChild(warning);
}

//TEMP: DEBUG
const axisX = new THREE.Vector3(1, 0, 0);
const axisY = new THREE.Vector3(0, 1, 0);
const axisZ = new THREE.Vector3(0, 0, 1);
var whoooop = true;

function animate() {
    //Loop and render
    //setTimeout(function() {
        requestAnimationFrame(animate);
    //}, 1000 / 60);
    renderer.render(scene, camera);

    //Animate stars
    starField.rotation.x += 0.0005;
    starField.rotation.y += 0.0005;

    //Animate glowing object
    for (var i = 0; i < glowingObject.children.length; i++) {
        var particle = glowingObject.children[i];
        particle.position.add(particle.userData.velocity);
    }

    //TEMP: FUN TIME
    if (mouseDown && whoooop) {
        var zeroVector = new THREE.Vector3();
        for (var i = 0; i < glowingObject.children.length; i++) {
            var particle = glowingObject.children[i];
            particle.userData.velocity.add(particle.userData.velocity.multiplyScalar(-1));

            if (particle.userData.velocity.distanceTo(zeroVector) > 0.1) {
                particle.position.set(0, 0, 0);
                particle.userData.velocity.set(
                    (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.01,
                    (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.01,
                    (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.01
                );
            }
        }
        whoooop = false;
    }
    if (!mouseDown)
        whoooop = true;
}
