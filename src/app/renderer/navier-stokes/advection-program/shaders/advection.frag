#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform float dt;
uniform sampler2D velocityField;
uniform sampler2D colorField;

void main() {
  vec2 currentCoordinate = v_texCoord.xy;
  vec2 newCoordinate = currentCoordinate - dt * texture(velocityField, currentCoordinate).xy;
  vec3 newColor = texture(colorField, newCoordinate).xyz;

  outColor = vec4(newColor, 1.0);
}
