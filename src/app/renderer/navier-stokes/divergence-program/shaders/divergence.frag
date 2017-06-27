#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D velocityField;
uniform float dt;

void main() {
  float factor = (2.0 * 0.1 * 0.5) / dt;

  vec2 xStep = vec2(1.0, 0.0) / 512.0;
  vec2 yStep = vec2(0.0, 1.0) / 512.0;

  float Xp = texture(velocityField, v_texCoord + xStep).x;
  float Xm = texture(velocityField, v_texCoord - xStep).x;
  float Yp = texture(velocityField, v_texCoord + yStep).y;
  float Ym = texture(velocityField, v_texCoord - yStep).y;

  float divergence = -factor * (Xp - Xm + Yp - Ym);
  outColor = vec4(divergence, 0.0, 0.0, 1.0);
}
