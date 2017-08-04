// Visina in sirina animacije
var width = window.innerWidth;
var height = window.innerHeight;

// Interaktivnost
var socket = io();

// Inicializiraj kamero, sceno, render
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 50;    // Zoom out da se kaj vidi
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(width, height);
renderer.setClearColor(0xffffff);

//controls = new THREE.TrackballControls( camera );
//controls.target.set( 0, 0, 0 );

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
        var randSpan = function() {
            return Math.random() * .005 - .0025;
        };

        o.rx += randSpan();
        o.ry += randSpan();
        o.rz += randSpan();


        o.position.x += o.rx;
        o.position.y += o.ry;
        o.position.z += o.rz;
        o.rotateX(o.rx);
        o.rotateY(o.ry);
        o.rotateZ(o.rz);

        // Glitch rotacija!
        //o.applyMatrix( pivot.matrixWorld );
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

    var k = kvader(d, d, d, m);

    return k;
}

/*
objekti.push(randomKvadrat());

objekti.map(function (o) {
    scene.add(o);
});
*/

render();

var pivot = new THREE.Object3D();

function dodajRandomKvadrat() {
    var razpon = 20;
    var k = randomKvadrat();
    k.position.x += (Math.random() * razpon) - razpon / 2;
    k.position.y += (Math.random() * razpon) - razpon / 2;
    k.position.z += (Math.random() * razpon) - razpon / 2;
    k.rx = 0;
    k.ry = 0;
    k.rz = 0;
    objekti.push(k);
    pivot.add(k);
    scene.add(k);
}

scene.add(pivot);

function obrniGrupo(ev) {
    return;
    var movX = ev.movementX;
    var movY = ev.movementY;

    pivot.rotateX(movX / 1000);
    pivot.rotateY(movY / 1000);
}

// Glitch rotacija!
//window.addEventListener('mousemove', obrniGrupo);

window.addEventListener('click', ustvariKvadrat);
window.addEventListener('touchend', ustvariKvadrat);

function ustvariKvadrat() {
    //dodajRandomKvadrat();
    socket.emit('dodajKvadrat', "lal");
}

function dodajEnga() {
    dodajRandomKvadrat();
}
setInterval(dodajEnga, 1500);

socket.on('dodajKvadrat', function(msg){
    dodajRandomKvadrat();
});

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
