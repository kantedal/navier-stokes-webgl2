#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

void main() {
  vec2 center = vec2(0.5, 0.5);
  float distance = distance(v_texCoord, center);
	outColor = vec4(vec3(1.0 - step(0.2, distance)), 1.0);
  //outColor = vec4(vec3(1.0), 1.0);
}
