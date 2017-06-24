#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D voxels;
uniform sampler2D velocityField;

uniform vec2 externalForce;
uniform vec2 resolution;

void main() {
	outColor = vec4(texture(voxels, v_texCoord).rgb, 1.0);
}
