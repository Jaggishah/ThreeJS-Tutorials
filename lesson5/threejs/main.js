import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl');
// const mesh = new THREE.Mesh(
//   new THREE.BoxGeometry(),
//   new THREE.MeshBasicMaterial({color:"#fff"})
// );

const gui = new GUI()

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader(); 
const doorColorTextures = textureLoader.load('static/textures/door/color.jpg')
const doorAlphaTextures = textureLoader.load('static/textures/door/aplha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('static/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('static/textures/door/height.jpg')
const dooroNormalTexture = textureLoader.load('static/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('static/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('static/textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('static/textures/matcaps/1.png');
const gradientTexture = textureLoader.load('static/textures/gradients/3.png');

var r = "https://threejs.org/examples/textures/cube/Bridge2/";
var urls = [ r + "posx.jpg", r + "negx.jpg",
            r + "posy.jpg", r + "negy.jpg",
            r + "posz.jpg", r + "negz.jpg" ];
            const environmentTexture = cubeTextureLoader.load([
              'static/textures/environmentMaps/0/px.jpg',
              'static/textures/environmentMaps/0/nx.jpg',
              'static/textures/environmentMaps/0/py.jpg',
              'static/textures/environmentMaps/0/ny.jpg',
              'static/textures/environmentMaps/0/pz.jpg',
              'static/textures/environmentMaps/0/nz.jpg',
            ]);

// const material = new THREE.MeshBasicMaterial()
// material.side = THREE.DoubleSide
// material.map = doorColorTextures 
// material.wireframe = true

// const material = new THREE.MeshNormalMaterial()

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial() 

// const material = new THREE.MeshLambertMaterial()
// const material = new THREE.MeshToonMaterial();
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.1
material.metalness = 0.9
// material.map = doorColorTextures
material.envMap = environmentTexture
material.needsUpdate = true
material.side = THREE.DoubleSide

gui.add(material,'roughness').max(1).min(0.1).step(0.0001)
gui.add(material,'metalness').max(2).min(0.1).step(0.0001)


material.shininess = 100
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5,16,16),
  material
);

sphere.position.x = -1.5;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1,1),
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

const ambientLight = new THREE.AmbientLight(0xffffff,1.2);
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff,4);
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight) 

const sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}


const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,1000)
camera.position.z = 2;

const controls = new OrbitControls(camera,canvas)

const render = new THREE.WebGLRenderer({
  canvas
})

render.setSize(sizes.width, sizes.height);
render.render(scene,camera);
0
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = 0.1 * elapsedTime; 
  plane.rotation.y = 0.1 * elapsedTime; 
  torus.rotation.y = 0.1 * elapsedTime; 
  sphere.rotation.x = 0.15 * elapsedTime; 
  plane.rotation.x = 0.15 * elapsedTime; 
  torus.rotation.x = 0.15 * elapsedTime; 


  controls.update();
  render.render( scene, camera);
  window.requestAnimationFrame(tick);
}
tick();