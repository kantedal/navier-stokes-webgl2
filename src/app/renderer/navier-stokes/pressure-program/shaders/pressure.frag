#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D pressureField;
uniform sampler2D divergenceField;
uniform float dt;

void main() {
  float Xp = texture(pressureField, v_texCoord + vec2(2.0, 0.0) / 512.0).x;
  float Xm = texture(pressureField, v_texCoord - vec2(2.0, 0.0) / 512.0).x;
  float Yp = texture(pressureField, v_texCoord + vec2(0.0, 2.0) / 512.0).x;
  float Ym = texture(pressureField, v_texCoord - vec2(0.0, 2.0) / 512.0).x;
  float d = texture(divergenceField, v_texCoord).x;

  float newPressure = (d + Xp + Xm + Yp + Ym) / 4.0;
  outColor = vec4(newPressure, 0.0, 0.0, 1.0);
}
