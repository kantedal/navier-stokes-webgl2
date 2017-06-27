#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D pressureField;
uniform sampler2D velocityField;
uniform float dt;

void main() {
  vec2 currentVelocity = texture(velocityField, v_texCoord).xy;

  float Xp = texture(pressureField, v_texCoord + vec2(1.0, 0.0) / 512.0).x;
  float Xm = texture(pressureField, v_texCoord - vec2(1.0, 0.0) / 512.0).x;
  float Yp = texture(pressureField, v_texCoord + vec2(0.0, 1.0) / 512.0).x;
  float Ym = texture(pressureField, v_texCoord - vec2(0.0, 1.0) / 512.0).x;

  float newVelocityX = currentVelocity.x - (dt / (2.0 * 0.1 * 0.5)) * (Xp - Xm);
  float newVelocityY = currentVelocity.y - (dt / (2.0 * 0.1 * 0.5)) * (Yp - Ym);

  outColor = vec4(newVelocityX, newVelocityY, 0.0, 1.0);
}
