#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D colorField;
uniform sampler2D velocityField;
uniform sampler2D velocityVectors;

void main() {
  vec3 color = texture(colorField, v_texCoord).rgb;
  vec3 velocity = texture(velocityField, v_texCoord).rgb;
  vec3 velocityVector = texture(velocityVectors, v_texCoord).rgb;

  if (length(velocityVector) != 0.0) {
    outColor = vec4(abs(velocityVector), 1.0);
  }
  else {
    outColor = vec4(abs(color), 1.0);
  }
}
