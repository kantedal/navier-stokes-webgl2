#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D u_texture;

void main() {
  outColor = vec4(abs(texture(u_texture, v_texCoord).rgb), 1.0);
  //outColor = vec4(1.0, 0.0, 1.0, 1.0);
}
