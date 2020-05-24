attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform float time;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform int back;
uniform float phase;
varying vec2 vTextureCoord;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	
	float amp = 0.3;
	float mult = 5.0;
	float freq = 2.0;
	

	vTextureCoord = aTextureCoord;

	
	
	if (back==0)
	{
		offset.z = amp * sin((aTextureCoord.s * mult) * freq + phase);
		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
	}
	else if(back==1)
	{
		offset.z = amp * sin((aTextureCoord.s * mult) * freq - phase);
		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition-offset, 1.0);
	}

}
