
varying vec2 vUv;
varying vec3 vertexNormal;


void main(){
    vUv = uv;
    vertexNormal =normalize(normalMatrix * normal); 
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );




}