import "./style.css";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import gsap from "gsap";


// const image = new Image();
// const textures = new THREE.Texture(image);
// image.onload = () => {
//   textures.needsUpdate = true
// }

// image.src = 'static/textures/door/color.jpg';
// console.log("hellop", image)

const texturLoader = new THREE.TextureLoader();
const textures = texturLoader.load('static/textures/door/color.jpg')
const canvas = document.querySelector('canvas.webgl');
const gui = new GUI();

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry();
console.log(geometry.attributes)
const material = new THREE.MeshBasicMaterial({ map : textures});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);
const paramter = {
  spin : () => {
    console.log("spin")
    gsap.to(mesh.rotation,{
      duration : 1,
      x : mesh.rotation.x + Math.PI * 2,
      z : mesh.rotation.z + Math.PI * 2
    })
  }
}

gui.add(mesh.position,'y',-3,3,0.01).name('elevation')
gui.add(mesh, 'visible');
gui.add(material,'wireframe');
gui.add(paramter,'spin')

gui.addColor(material,'color')
const sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height,0.1,1000);
const controls = new OrbitControls(camera,canvas,);
controls.dampingFactor = 0.2;
camera.position.z = 2;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene,camera);

console.log(canvas)

const clock = new THREE.Clock();

const tick = () => {
  // const elpased = clock.getElapsedTime();
  // mesh.rotation.y = Math.sin(elpased);
  renderer.render( scene , camera);
  window.requestAnimationFrame(tick);
};

tick()