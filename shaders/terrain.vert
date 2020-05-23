
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;


void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	
	vTextureCoord = aTextureCoord;

	float normScale = 0.2;

	vec4 filter = texture2D(uSampler2, vec2(0.0,0)+vTextureCoord);

	if(filter.b < 0.4)
		offset=aVertexNormal*normScale*0.1;
	else
		offset=aVertexNormal*normScale*filter.b;		

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}
