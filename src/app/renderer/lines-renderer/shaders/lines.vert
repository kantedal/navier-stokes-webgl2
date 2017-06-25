#version 300 es
precision highp float;

in float a_isStartingPoint;
in vec2 a_texCoords;

out float v_isStartingPoint;

uniform sampler2D velocityField;

void main() {
  vec2 coordinate = a_texCoords * 2.0 - vec2(1.0);

  if (a_isStartingPoint == 1.0) {
    gl_Position = vec4(coordinate, 0.0, 1.0);
  }
  else {
    //gl_Position = vec4(coordinate + 0.05 * vec2(sin(a_texCoords.x - 1.0), sin(a_texCoords.y - 1.0)), 0.0, 1.0);
    gl_Position = vec4(coordinate + 0.05 * texture(velocityField, a_texCoords).xy, 0.0, 1.0);
  }

  v_isStartingPoint = a_isStartingPoint;

}