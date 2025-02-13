
varying vec2 vUv;
varying vec3 vertexNormal;

varying vec3 vPosition;

void main(){

    vPosition = position;

    vUv = vec2(uv.x*2.-1.,uv.y-0.5);
    vertexNormal =normalize(normalMatrix * normal); 
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );




}