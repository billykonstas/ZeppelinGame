#ifdef GL_ES
precision highp float;
#endif

varying vec3 vVertexPosition;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;

uniform float nSuppliesDelivered;

void main() {
	
	float cutoff = nSuppliesDelivered/5.0;

	if(vVertexPosition.x + 0.5 > cutoff)
		gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
	else
		gl_FragColor = vec4(1.0-(vVertexPosition.x + 0.5), (vVertexPosition.x + 0.5), 0.0, 1.0);
}