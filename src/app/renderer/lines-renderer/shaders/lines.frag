#version 300 es
precision highp float;

in float v_isStartingPoint;

out vec4 outColor;

void main() {
  outColor = mix(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), v_isStartingPoint);
}
