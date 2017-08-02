// Visina in sirina animacije
var width = window.innerWidth;
var height = window.innerHeight;

// Inicializiraj kamero, sceno, render
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 50;    // Zoom out da se kaj vidi
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(width, height);
renderer.setClearColor(0xffffff);

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        document.getElementById("anim-container").appendChild(renderer.domElement);
    }

    var node = document.createElement("span");
    node.innerHTML = "sz3";
    node.style.position = "absolute";
    node.style.left = "50%";
    node.style.top = "50%";
    node.style["z-index"] = 1;
    node.style.opacity = .5;
    node.style.cursor = "default";
    node.style["user-select"] = "none";
    document.getElementById("anim-container").appendChild(node);
};

var objekti = [];

// Render l00p
function render() {
	  requestAnimationFrame(render);

    // Animiraj zadeve
   animirajStuff();

	  renderer.render(scene, camera);
}

function animirajStuff () {
    // uizi premikaj kvadrate
    objekti.map(function (o) {
        o.position.x += Math.random() * .4 - .2;
        o.position.y += Math.random() * .4 - .2;
    });
}

function randomMat() {
    var mat = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        transparent: true
    });

    mat.opacity = Math.random();

    return mat;
}

var mat1 = randomMat();

// Dodaj kvader
function kvader(dolzina, sirina, debelina = 1, mat = mat1) {
    var geo = new THREE.BoxBufferGeometry(dolzina, sirina, debelina);
    var kvader = new THREE.Mesh(geo, mat);

    return kvader;
}

function randomKvadrat() {
    var m = randomMat();

    var d = Math.random() * 20

    var k = kvader(d, d, 1, m);

    return k;
}

/*
objekti.push(randomKvadrat());

objekti.map(function (o) {
    scene.add(o);
});
*/

render();

function dodajRandomKvadrat() {
    var razpon = 20;
    var k = randomKvadrat();
    k.position.x += (Math.random() * razpon) - razpon / 2;
    k.position.y += (Math.random() * razpon) - razpon / 2;
    objekti.push(k);
    scene.add(k);
}
window.addEventListener('click', dodajRandomKvadrat);
window.addEventListener('touchend', dodajRandomKvadrat);
function dodajEnga() {
    dodajRandomKvadrat();
}
setInterval(dodajEnga, 1500);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

var socket = io();
