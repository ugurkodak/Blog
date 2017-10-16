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
    var clickPosition = new THREE.Vector2();
    document.onmousemove = function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    document.onmousedown = function (e) {
        mouseDown = true;
        clickPosition.setX(mouseX);
        clickPosition.setY(mouseY);
    }
    document.onmouseup = function (e) {
        mouseDown = false;
    }

    //Setup scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
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
    var glowingObject = new THREE.Object3D();
    var glowTexture = new THREE.TextureLoader().load("home/glow.png");
    var glowMaterial = new THREE.SpriteMaterial({
        map: glowTexture, 
        color: 0xff00ff
    });
    for (var i = 0; i < 100; i++) {
        var glowParticle = new THREE.Sprite(glowMaterial);
        //glowParticle.position.x = THREE.Math.randFloatSpread(1);
        //glowParticle.position.y = THREE.Math.randFloatSpread(1);
        //glowParticle.position.z = THREE.Math.randFloatSpread(1);
        //glowParticle.scale.set(0.2, 0.2, 1)
        glowingObject.add(glowParticle);
    }    
    glowingObject.position.z = -100;
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
        particlePosition = glowingObject.children[i].position;
       // if (mouseDown) {
            //var signedRandomMultiplierX = ;
            var signedRandomMultiplierY = Math.random() < 0.5 ? -1 : 1;
            var signedRandomMultiplierX = Math.random() < 0.5 ? -1 : 1;
            particlePosition.x += (Math.random() < 0.5 ? -1 : 1) * 0.01;
            particlePosition.y += (Math.random() < 0.5 ? -1 : 1) * 0.01;
            particlePosition.z += (Math.random() < 0.5 ? -1 : 1) * 0.01;
            //THREE.Math.clamp(glowingObject.children[i].position.x, 0, 0.5);
            //console.log(particlePosition);            
            
            
            //glowingObject.children[i].position.x = THREE.Math.clamp(mouseX - glowingObject.children[i].position.x);
            //glowingObject.children[i].position.y = THREE.Math.clamp(mouseY - glowingObject.children[i].position.x);
            //glowingObject.children[i].position.z += signedRandom * Math.random * 0.001;            
       // }
    }
    if (glowingObject.position.z < 0)
    glowingObject.position.z += Math.abs(glowingObject.position.z) * 0.01;
    //glowingObject.rotation.x += 0.01;
}
