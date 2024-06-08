// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
// import * as THREE from "three";

// console.log(THREE)
// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

import * as THREE from 'three';

const canvas = document.querySelector('.webgl');
// red cube
const scene = new THREE.Scene();
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh( geometry, material);
// scene.add(mesh);
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1) , new THREE.MeshBasicMaterial({ color: 0xff0000  }))
group.add(cube1);


// mesh.rotation.x = 2;
// Sizes
const sizes = {
    width : 800,
    height : 600
}

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
camera.position.z = 3;

scene.add(camera)

// Renderer
console.log(canvas)
const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height);



const clock = new THREE.Clock();

const tick = () => {
    const elpased = clock.getElapsedTime();

    camera.position.x = Math.sin(elpased);
    camera.position.y = Math.cos(elpased);

    renderer.render( scene , camera);
    window.requestAnimationFrame(tick)
}

tick()