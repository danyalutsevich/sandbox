import * as THREE from 'three'
import * as dat from 'dat.gui'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer()
const light = new THREE.DirectionalLight(0xFFEEAA, 1)

light.position.set(0, 0, 1)
scene.add(light)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)


const box = new THREE.BoxGeometry(1, 1, 1, 10, 10)
const boxMaterial = new THREE.MeshPhongMaterial(
  {
    color: 0xFFAAAA,
    flatShading: THREE.FlatShading,
    side: THREE.DoubleSide
  })
const boxMesh = new THREE.Mesh(box, boxMaterial)



scene.add(boxMesh)

camera.position.z = 5
boxMesh.position.z = 2

let prevx = 0;
let prevy = 0;
let clicked = false;
const slideValue = 0.1;
let slideX = 0;
let slideY = 0;

renderer.domElement.addEventListener('mousedown', () => {

  clicked = true
})

renderer.domElement.addEventListener('mouseup', () => {

  clicked = false
})

renderer.domElement.addEventListener("mousemove", (event) => {

  if (clicked) {


    slideY = prevx - event.clientX;
    slideX = prevy - event.clientY;
    //changed X and Y to make rotation not inverted

    prevx = event.clientX
    prevy = event.clientY

  }

})


function boxSegmentsRandom() {

  const { array } = boxMesh.geometry.attributes.position

  for (let i = 0; i < array.length; i += 3) {

    const x = array[i]
    const y = array[i + 1]
    const z = array[i + 2]

    array[i] = x + (Math.random()*2) -1
    array[i + 1] = y + (Math.random()*2) - 1
    array[i + 2] = z + (Math.random()*2) - 1

  }

}

function boxRotation() {

  if (slideX > 0.01) {

    boxMesh.rotation.x += slideX / 10
    slideX -= slideValue

  }
  else if (slideX < -0.01) {

    boxMesh.rotation.x += slideX / 10
    slideX += slideValue

  }

  if (slideY > 0.01) {

    boxMesh.rotation.y += slideY / 10
    slideY -= slideValue

  }
  else if (slideY < -0.01) {

    boxMesh.rotation.y += slideY / 10
    slideY += slideValue

  }

}



const gui = new dat.GUI()

const world = {
  box: {
    width: 1,
    height: 1,
    depth: 1,
    wSegments: 10,
    hSegments: 10,
    dSegments: 10
  }
}


function guiOnChange() {
  boxMesh.geometry.dispose()
  boxMesh.geometry = new THREE.BoxGeometry(world.box.width, world.box.height, world.box.depth, world.box.wSegments, world.box.hSegments, world.box.dSegments)

}

function guiOnChangeSegments() {
  boxMesh.geometry.dispose()
  boxMesh.geometry = new THREE.BoxGeometry(world.box.width, world.box.height, world.box.depth, world.box.wSegments, world.box.hSegments, world.box.dSegments)
  boxSegmentsRandom()

}

gui.add(world.box, 'width', 1, 20).onChange(guiOnChange)
gui.add(world.box, 'height', 1, 20).onChange(guiOnChange)
gui.add(world.box, 'depth', 1, 20).onChange(guiOnChange)
gui.add(world.box, 'wSegments', 1, 100).onChange(guiOnChangeSegments)
gui.add(world.box, 'hSegments', 1, 100).onChange(guiOnChangeSegments)
gui.add(world.box, 'dSegments', 1, 100).onChange(guiOnChangeSegments)


function animate() {

  renderer.render(scene, camera)


  boxRotation()
  requestAnimationFrame(animate)
}

animate()




