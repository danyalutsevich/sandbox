import * as THREE from 'three'
import * as dat from 'dat.gui'
import vert from './shaders/vertex.glsl'
import frag from './shaders/fragment.glsl'


const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const scene = new THREE.Scene()
const renderer = new THREE.WebGL1Renderer({ antialias: true })

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)
camera.position.set(0, 0, 2)

const raycaster = new THREE.Raycaster()



let uniforms = {
  
  time: { type: 'f', value: 0. },
  photo: { value: new THREE.TextureLoader().load('./img/yandhi.jpg') },
  displacement: { value: new THREE.TextureLoader().load('./img/disp6.jpg') },
  sheesh: { value: new THREE.TextureLoader().load('./img/sheesh.jpg') },
  progress: { type: 'f', value: 0 },
  rotation: { type: 'f', value: 0 },
  mouse: { type: 'v3', value: new THREE.Vector3() }
  
}

const mouse = new THREE.Vector2();

function onMouseMove( event ) {
  
  // calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
  
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

  if(intersects.length>0){
    uniforms.mouse.value = intersects[0].point

  }

	renderer.render( scene, camera );

}

renderer.domElement.addEventListener('mousemove',onMouseMove)



const gui = new dat.GUI()
gui.add(uniforms.progress, 'value', -1, 1, 0.01)
gui.add(uniforms.rotation, 'value', -10, 10, 0.001)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(2.5 * 1.3, 2.5, 10, 10), new THREE.ShaderMaterial({

  vertexShader: vert,
  fragmentShader: frag,
  uniforms

}))

scene.add(plane)

let milliseconds = 0;


function animate() {

  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  milliseconds += new Date().getMilliseconds();
  uniforms.time = { type: "f", value: milliseconds }

  // console.log(new Date().getMilliseconds())
}

animate()
