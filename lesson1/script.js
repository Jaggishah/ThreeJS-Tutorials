import * as THREE from 'three';

const canvas = document.querySelector('.webgl');
// red cube
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh( geometry, material);
scene.add(mesh);

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

renderer.render( scene , camera);