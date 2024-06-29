import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import typeface from './helvetiker_regular.typeface.json'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'




const scene = new THREE.Scene()

// axes helper 
// const axisHelper = new THREE.AxesHelper()
// scene.add(axisHelper);

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('./1.png')
console.log(matcapTexture)

const loader  = new FontLoader();
const font = loader.parse(typeface);

		// do something with the font
const geometry = new TextGeometry('Hello three.js!',{
  font:font,
  size: 0.4,
  depth: 0.1,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4
})

// geometry.computeBoundingBox()
// geometry.translate(
//   - (geometry.boundingBox.max.x - 0.02)  * 0.5,
//   - (geometry.boundingBox.max.y - 0.02) * 0.5,
//   - (geometry.boundingBox.max.z - 0.03) * 0.5,
// )
geometry.center( )




const textMaterial = new THREE.MeshMatcapMaterial({ matcap : matcapTexture})

const text = new THREE.Mesh(geometry,textMaterial);
scene.add(text)

const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45);

for ( let i = 0 ; i < 1000 ; i++){
  const donutMesh = new THREE.Mesh( donutGeometry, textMaterial);
  donutMesh.position.x = (Math.random() - 0.5) * 10
  donutMesh.position.y = (Math.random() - 0.5) * 10
  donutMesh.position.z = (Math.random() - 0.5) * 10

  donutMesh.rotation.x = Math.random() * Math.PI;
  donutMesh.rotation.y = Math.random() * Math.PI;

  const scale = Math.random()
  donutMesh.scale.set(scale,scale,scale)
  scene.add(donutMesh)
}

	

const canvas = document.querySelector('canvas.webgl');
// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial()

// const mesh = new THREE.Mesh(geometry,material);

// scene.add(mesh);

const sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,1000);
camera.position.z = 2


const control = new OrbitControls(camera,canvas);
const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)

const tick = () => {

  renderer.render( scene, camera);
  window.requestAnimationFrame(tick);
}
tick();