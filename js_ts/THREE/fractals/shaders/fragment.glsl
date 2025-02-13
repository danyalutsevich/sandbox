//thanks Yuri Artiukh for your tutorials
// AND ALSO THANKS TO The Art of Code VIDEO https://www.youtube.com/watch?v=6IWXkV82oyY

uniform float time;
uniform float rotation;
uniform float progress;

uniform float Cx;
uniform float Cy;

uniform vec3 mouse;

varying vec2 vUv;
varying vec3 vertexNormal;
varying vec3 vPosition;

// vec2 rotate(vec2 v,float a){
//     float s=sin(a/2.);
//     float c=cos(a/2.);
//     mat2 m=mat2(c*2.,-s*2.,s*2.,c*2.)*2.;
//     return m*v;
// }

float map(float value,float min1,float max1,float min2,float max2){
    return min2+(value-min1)*(max2-min2)/(max1-min1);
}

const float maxIterations=1000.;

float value(float x, float y, float Cx1, float Cy1) {

	float z1 = x;
	float z2 = y;

	for (float i=0.;i < maxIterations;i+=1.) {

		z1 = (z1 * z1) - (z2 * z2) + Cx;

		z2 = (2.* z1 * z2) + Cy;

		if ((z1 * z1) + (z2 * z2) >= 4.) {

			return i;
		}
	
	}

	return maxIterations;

}

float value(vec2 z, vec2 c) {

	for (float i=0.;i < maxIterations;i+=1.) {

        z = vec2((z.x*z.x)-(z.y*z.y)+c.x,(2.*z.x*z.y)+c.y);

		if (length(z) >= 2.) {

			return i;
		}
	
	}

	return maxIterations;

}




void main(){
    
    //float color = value(vUv.x*5.-2.5,vUv.y*5.-2.5,Cx,Cy);
	float Cxm = map(Cx,-1.,1.,0.,3.); 
	float Cym = map(Cy,-1.,1.,-1.5,1.5); 

   	float iter = value(vUv/progress+mouse.xy*progress,vec2(Cx,Cy));
	// iter= iter/(maxIterations/10.);

	vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
	// vec4 color = vec4(iter+0.1,iter+0.2,iter+0.3, 1.0);
  

	if(iter<10.){
		 iter= iter/(maxIterations/10.);
    	 color = vec4(iter+0.0, iter+1.0, iter+0.702, 1.0);
	}
	else if(iter<20.){
		 
    	 color = vec4(0.7686, 0.498, 0.0902, 1.0);
	}
	else if(iter<30.){

		 color = vec4(0.5098, 0.9216, 0.0392, 1.0);
	}
	else if(iter<40.){

		 color = vec4(0.0, 0.3882, 0.1294, 1.0);
	}
	else if(iter<50.){

		 color = vec4(0.0, 0.4667, 0.349, 1.0);
	}
	else if(iter<60.){

		 color = vec4(0.0118, 0.4118, 0.6784, 1.0);
	}
	else if(iter<70.){

		 color = vec4(0.0039, 0.0824, 0.7804, 1.0);
	}
	else if(iter<80.){

		 color = vec4(0.9686, 0.0, 1.0, 1.0);
	}
	else if(iter<90.){

		 color = vec4(0.8314, 0.0118, 0.5176, 1.0);
	}
	else if(iter<100.){

		 color = vec4(0.9216, 0.0392, 0.1137, 1.0);
	}
	else if(iter<150.){

		 color = vec4(0.4275, 0.0, 0.0353, 1.0);
	}
	else if(iter<200.){

		 color = vec4(0.4196, 0.3412, 0.0, 1.0);
	}
	else if(iter<250.){

		 color = vec4(0.1686, 0.4196, 0.0, 1.0);
	}
	else if(iter<300.){

		 color = vec4(0.0, 0.3216, 0.4196, 1.0);
	}
	else if(iter<400.){

		 color = vec4(0.0, 0.098, 0.4196, 1.0);
	}
	else if(iter<500.){

		 color = vec4(0.1608, 0.0, 0.4196, 1.0);
	}
	else if(iter<600.){

		 color = vec4(0.4196, 0.0, 0.4196, 1.0);
	}
	else if(iter<700.){

		 color = vec4(0.4078, 0.0, 0.4196, 1.0);
	}
	gl_FragColor=color;
    
}
