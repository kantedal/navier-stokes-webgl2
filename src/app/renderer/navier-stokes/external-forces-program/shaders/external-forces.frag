#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D voxels;
uniform sampler2D velocityField;

uniform vec2 externalForce;
uniform vec2 resolution;
uniform float dt;

void main() {
  vec2 currentVelocity = texture(velocityField, v_texCoord).xy;
  //currentVelocity = currentVelocity + dt * externalForce;
  currentVelocity = currentVelocity + dt * vec2(sin((v_texCoord.x - 1.0) * 2.0), cos((v_texCoord.y - 1.0) * 2.0));
	outColor = vec4(currentVelocity, 0.0, 1.0);
	//outColor = vec4(sin((v_texCoord.x - 1.0) * 2.0), cos((v_texCoord.x - 1.0) * 2.0), 0.0, 1.0);
}
