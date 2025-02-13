
varying vec3 vertexNormal;

void main(){
    
    float intensity=pow(.6-dot(vertexNormal,vec3(0.,0.,1.)),2.);
    
    gl_FragColor=vec4(.3,.6,1.,1.)*intensity;
    
}
