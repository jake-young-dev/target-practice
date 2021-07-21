/* 
    Target Practice game in ThreeJS
    Author: jake-young-dev
    Requires: ThreeJS
*/

//imports
import * as THREE from "../node_modules/three/build/three.module.js";

//scene and camera variables
const scene = new THREE.Scene();
//90 degrees (straight down)
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//raycaster for mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

//target variables

var geometry = new THREE.CircleGeometry(0.1, 50);
var material = new THREE.MeshBasicMaterial({color: 0xffffff});
var target = new THREE.Mesh(geometry, material);
var x = 0;
var y = 0;
scene.add(target);

//render function
function render() {

}

//animate screen loop
function animate() {
    requestAnimationFrame(animate);
    render();
    renderer.render(scene, camera);
} animate();
