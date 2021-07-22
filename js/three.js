/* 
    Target Practice game in ThreeJS
    Author: jake-young-dev
    Requires: ThreeJS
*/

//imports
import * as THREE from "../node_modules/three/build/three.module.js";

//scene and camera variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//raycasting for mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

/* Target variables */
//for aim report
var targetList = [];
var targetsHit = 0;
var clicks = 0;
//add first circle target
var geometry = new THREE.CircleGeometry(0.1, 50);
var material = new THREE.MeshBasicMaterial({color: 0xffffff});
var target = new THREE.Mesh(geometry, material);
//for random positioning
var x = 0;
var y = 0;
//add target to scene
scene.add(target);
targetList.push(target);
/* End of Target variables */

//timer
var time = "|";
var endTime = "|"
const SECONDS = 1000;

//render the screen
function render() {
    //make sure there is only one target, and stop after 10 are hit
    if(targetList.length < 1 && targetsHit < 10) {
        //calculate psuedo random position
        let x2 = (Math.random() * 9) - 4.5;
        let y2 = (Math.random() * 9) - 4.5;
        //make sure targets are not in same spot
        while(Math.abs(x2-x) < 1 || Math.abs(y2-y) < 1) {
            x2 = (Math.random() * 9) - 4.5;
            y2 = (Math.random() * 9) - 4.5;
        }
        x = x2;
        y = y2;

        //create a new target if hit
        geometry = new THREE.CircleGeometry(0.1, 50);
        material = new THREE.MeshBasicMaterial({color: 0xffffff});
        target = new THREE.Mesh(geometry, material);
        target.position.x = x;
        target.position.y = y;
        targetList.push(target);
        scene.add(target);
        console.log(x + ", " + y);
    }
}

//animation loop
function animate() {
    requestAnimationFrame(animate);
    render();
    renderer.render(scene, camera);
} animate();

//when mouse is clicked
function onDocumentMouseDown(event) {
    event.preventDefault();

    //start timer after first click
    if(time == "|") {
        time = new Date()
        time = time.getTime()/SECONDS;
    }

    clicks += 1;

    //update mouse location
    mouse.x = (event.clientX / renderer.domElement.width ) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.height ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    //was a target hit
    var intersects = raycaster.intersectObject(target);
    for(let i = 0; i < intersects.length; i++) {
        if(intersects[i].object == target) {
            scene.remove(target);
            targetList.pop();
            targetsHit += 1;
            if(targetsHit >= 10) {
                endTime = new Date();
                endTime = endTime.getTime()/SECONDS;
                let totalTime = endTime - time;
                alert("You hit " + targetsHit + "/" + clicks + " shots in: " + totalTime.toString().substring(0, 6) + " seconds");
                //reset game/timer
                clicks = 0;
                targetsHit = 0;
                time = "|";
                endTime = "|";
            }
        }
    }
    renderer.render(scene, camera);
}

window.addEventListener('mousedown', onDocumentMouseDown, false);