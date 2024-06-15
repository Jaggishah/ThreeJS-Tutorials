

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const canvas = document.querySelector('.webgl');

// red cube
const scene = new THREE.Scene();
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh( geometry, material);
// scene.add(mesh);
const group = new THREE.Group();
scene.add(group);

const geometry = new THREE.BufferGeometry();

const count = 500;
const positionArray = new Float32Array(count *3 * 3);

for ( let i = 0; i< count * 3*3 ; i++){
    positionArray[i] = (Math.random() - 0.5) * 4
}

const positionAttribute = new THREE.BufferAttribute(positionArray,3);
geometry.setAttribute('position',positionAttribute)

const cube1 = new THREE.Mesh( geometry , 
new THREE.MeshBasicMaterial({ color: 0xff0000 ,wireframe:true }))
group.add(cube1);


// mesh.rotation.x = 2;
// Sizes
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}

window.addEventListener('resize' , () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio( Math.min(window.devicePixelRatio,2) )
})

window.addEventListener('dblclick',() => {
    const dbFullScreen = document.fullscreenElement || document.webkitFullscreenElement;
    if(!dbFullScreen){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen();
        }
        else if(canvas.webkitFullscreenElement){
            canvas.webkitFullscreenElement()
        }
        
    }else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }
        
    }
})
// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height,0.1,1000);
const controls = new OrbitControls(camera, canvas);
// controls.target.y = 2;
// controls.update();
camera.position.z = 3;

scene.add(camera)   

// Renderer
console.log(canvas)
const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio( Math.min(window.devicePixelRatio,2) )



const clock = new THREE.Clock();

const tick = () => {
    const elpased = clock.getElapsedTime();

    // camera.position.x = Math.sin(elpased);
    cube1.rotation.y = Math.cos(elpased);

 
    renderer.render( scene , camera);
    window.requestAnimationFrame(tick)
}

tick()