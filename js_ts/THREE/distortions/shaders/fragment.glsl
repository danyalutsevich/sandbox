//thanks Yuri Artiukh for your tutorials
uniform float time;
uniform float rotation;
uniform float progress;

uniform vec3 mouse;

uniform sampler2D photo;
uniform sampler2D sheesh;
uniform sampler2D displacement;

varying vec2 vUv;
varying vec3 vertexNormal;
varying vec3 vPosition;

vec2 rotate(vec2 v,float a){
    float s=sin(a/2.);
    float c=cos(a/2.);
    mat2 m=mat2(c*2.,-s*2.,s*2.,c*2.)*2.;
    return m*v;
}

float map(float value,float min1,float max1,float min2,float max2){
    return min2+(value-min1)*(max2-min2)/(max1-min1);
}

void main(){
    
    vec4 disp=texture2D(displacement,vUv);
    vec2 dispvUv=vec2(vUv.x,vUv.y);
    
    // displacement texture
    
    // vec2 dispvUv = vec2(vUv.x +0.01*sin((vUv.y*time/40.)/2.),vUv.y+0.01*sin((vUv.x*time/40.0)/2.));
    // jiggly looped effect
    
    // vec2 dispvUv=vec2(vUv.x,vUv.y+progress*disp.r);
    // displacing depending on progress
    
    // dispvUv=rotate(dispvUv,time/10000.);
    //to make texture rotate forever
    
    dispvUv.y=mix(vUv.y,disp.r-.2,progress/*+sin(time/10000.)*/);
    
    vec4 color=texture2D(photo,dispvUv);
    
    color.r=texture2D(photo,dispvUv+vec2(0.,.05)*progress).r;
    color.g=texture2D(photo,dispvUv+vec2(0.,.1)*progress).g;
    color.b=texture2D(photo,dispvUv+vec2(0.,.2)*progress).b;
    
    // gl_FragColor=color;
    
    vec2 direction=normalize(vPosition.xy-mouse.xy);
    float dist=distance(vPosition,mouse);
    float prox=1.-map(dist,0.,1.,0.,1.);
    prox=clamp(prox,0.,1.);
    
    vec2 zoomedUv=vUv+direction*prox*progress;
    vec2 zoomedUv1=mix(vUv,mouse.xy+vec2(0.5),prox*progress);
    
    vec4 sheesh=texture2D(sheesh,zoomedUv1);
    
    // gl_FragColor = vec4(direction,1.,1.);
    gl_FragColor=sheesh;
    // gl_FragColor = vec4(dist);
    
}
