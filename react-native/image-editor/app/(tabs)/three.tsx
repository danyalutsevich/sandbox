import * as React from "react";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer, THREE } from "expo-three";
import { Asset } from "expo-asset";

export default function Three() {
  return (
    <GLView
      style={{ flex: 1, borderWidth: 10, borderColor: "black" }}
      onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
        // Create a WebGLRenderer without a DOM element
        const renderer = new Renderer({ gl });
        console.log({ gl, renderer });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        // 2. Set up scene, camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          gl.drawingBufferWidth / gl.drawingBufferHeight,
          0.1,
          1000,
        );
        camera.position.z = 2;

        // 3. Load texture
        const textureAsset = Asset.fromModule(
          require("@/assets/images/react-logo.png"),
        );
        await textureAsset.downloadAsync();
        const texture = new THREE.TextureLoader().load(textureAsset.localUri);

        // 4. Create textured cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ map: texture });

        const material = new THREE.MeshBasicMaterial({
          color: 0xff0000, // red
          map: texture, // comment this out to test plain material
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // 5. Animation loop
        const render = () => {
          console.log("rendering");
          requestAnimationFrame(render);
          cube.rotation.y += 0.01;
          cube.rotation.x += 0.01;
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        render();
      }}
    />
  );
}
