import * as THREE from 'three'
import GLOBEvertexShader from './shaders/vertex.glsl'
import GLOBEfragmentShader from './shaders/fragment.glsl'

import ATMOvertexShader from './shaders/ATMOvertex.glsl'
import ATMOfragmentShader from './shaders/ATMOfragment.glsl'

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const scene = new THREE.Scene()
const renderer = new THREE.WebGL1Renderer({ antialias: true })
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)


camera.position.set(0, 0, 15)




const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({

  // vertexShader: vertexShader,
  // fragmentShader: fragmentShader
  // same as
  vertexShader: GLOBEvertexShader,
  fragmentShader: GLOBEfragmentShader,
  uniforms: {

    globeTexture: {
      value: new THREE.TextureLoader().load('./img/earthUV.jpg')
    }

  }

})
)

scene.add(sphere)


const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(6, 50, 50), new THREE.ShaderMaterial({

  vertexShader: ATMOvertexShader,
  fragmentShader: ATMOfragmentShader,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide


})
)


scene.add(atmosphere)





function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  // sphere.rotation.z+=0.01;
  // sphere.rotation.x+=0.01;
  sphere.rotation.y += 0.005;
}

animate()

