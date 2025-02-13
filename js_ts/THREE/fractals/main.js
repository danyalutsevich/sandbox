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
camera.position.set(0, 0, 0.7)

const raycaster = new THREE.Raycaster()



let uniforms = {
  
  time:{type: "f", value: 0 },
  progress: { type: 'f', value: 0.41 },
  rotation: { type: 'f', value: 0 },
  mouse: { type: 'v3', value: new THREE.Vector3() },
  Cx:{type:'f',value:0.3},
  Cy:{type:'f',value:0.47}


  
}

const mouse = new THREE.Vector2();
let mouseup=false


function onMouseMove( event ) {
  
  // calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
  if(mouseup){

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1+0.5;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1+0.5;

    raycaster.setFromCamera( mouse, camera );
    
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children );
    
    if(intersects.length>0){
      uniforms.mouse.value = intersects[0].point
      
    }
    
    renderer.render( scene, camera );
  }

}

renderer.domElement.addEventListener('mousemove',onMouseMove)
renderer.domElement.addEventListener('mousedown',()=>{
  mouseup=true
})
renderer.domElement.addEventListener('mouseup',()=>{
  mouseup=false
})


const gui = new dat.GUI()
gui.add(uniforms.progress, 'value', 0.001, 10, 0.01)
gui.add(uniforms.rotation, 'value', -2, 2, 0.001)
gui.add(uniforms.Cx, 'value', -1, 1, 0.01)
gui.add(uniforms.Cy, 'value', -1, 1, 0.00001)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 1, 1, 1), new THREE.ShaderMaterial({

  vertexShader: vert,
  fragmentShader: frag,
  uniforms

}))

scene.add(plane)

let milliseconds = 0;

let Cvalue=0
let CvalueFlag=false

function animate() {

  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  // milliseconds += new Date().getMilliseconds();
  milliseconds +=500
  uniforms.time.value=milliseconds

  uniforms.Cx.value=Math.sin(milliseconds/1000000)/2
  if(!CvalueFlag){

    Cvalue+=0.0005
    
  }
  else{
    
    Cvalue-=0.0005

  }
  if(Cvalue>1){
    CvalueFlag=true

  }

  if(Cvalue<-1){

    CvalueFlag=false

  }
  // uniforms.progress.value+=0.001
  // uniforms.Cx.value=Cvalue





}

animate()
