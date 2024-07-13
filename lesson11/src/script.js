import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({width:400})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// galaxy

const parameter = {};
parameter.count = 1000;
parameter.sizes = 0.02;
parameter.radius = 5;
parameter.branches = 3;
parameter.spin = 1;
parameter.randomness = 1;
parameter.randomnessPower = 1;

let geometry = null;
let material = null;
let points = null;


const generateGalaxy = () => {
    if( points !== null){
        geometry.dispose();
        material.dispose();
        scene.remove(points);
    }
    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array( parameter.count * 3);

    for( let i = 0; i < parameter.count; i++){
        const i3 = i*3;
        const radius = Math.random() * parameter.radius;
        const spinAngle = radius * parameter.spin;
        const branchAngles = (i % parameter.branches) / parameter.branches * Math.PI * 2;

        const randomX = Math.pow(Math.random() , parameter.randomness);
        const randomY = Math.pow(Math.random() , parameter.randomness);
        const randomZ = Math.pow(Math.random() , parameter.randomness);
        positions[i3] =  Math.cos(branchAngles + spinAngle) * radius + randomX; 
        positions[i3 + 1] = 0 + randomY;
        positions[i3 + 2] = Math.sin(branchAngles + spinAngle) * radius + randomZ; 
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    material = new THREE.PointsMaterial({
        size : parameter.sizes,
        sizeAttenuation : true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    })

    points = new THREE.Points( geometry, material);
    scene.add(points);
}

generateGalaxy()

gui.add(parameter,'count',100,100000,100).onFinishChange(generateGalaxy)
gui.add(parameter,'sizes',0.001,0.1,0.001).onFinishChange(generateGalaxy)
gui.add(parameter,'radius',0.01,20,0.01).onFinishChange(generateGalaxy)
gui.add(parameter,'branches',2,20,1).onFinishChange(generateGalaxy) 
gui.add(parameter,'spin',-5,5,0.001).onFinishChange(generateGalaxy)
gui.add(parameter,'randomness',0,2,0.0001).onFinishChange(generateGalaxy) 
gui.add(parameter,'randomnessPower',1,10.0001).onFinishChange(generateGalaxy)
/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()