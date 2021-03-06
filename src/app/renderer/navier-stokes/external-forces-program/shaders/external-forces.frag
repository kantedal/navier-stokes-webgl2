#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D voxels;
uniform sampler2D velocityField;

uniform vec2 externalForce;
uniform vec2 previousMousePosition;
uniform vec2 mousePosition;
uniform vec2 resolution;
uniform float dt;
uniform float time;

void main() {
  vec2 currentVelocity = texture(velocityField, v_texCoord).xy;
  //currentVelocity = currentVelocity + dt * externalForce;
  //currentVelocity = currentVelocity + 0.003 * vec2(sin(time * 5.0 - 1.0), cos(time * 4.0)); //cos((v_texCoord.y + 0.5 + time) * 2.0));
  //currentVelocity = 0.05 * normalize(vec2(sin(time) + v_texCoord.x - 0.5, cos(time) + v_texCoord.y - 0.5)); //cos((v_texCoord.y + 0.5 + time) * 2.0));

	if (length(mousePosition) != 0.0 && length(previousMousePosition) != 0.0) {
	  vec2 mouseDir = 40.0 * (mousePosition - previousMousePosition); //normalize(mousePosition - v_texCoord);
	  float mouseDistance = pow(1.0 - distance(mousePosition, v_texCoord), 12.0);
	  currentVelocity = currentVelocity + dt * mouseDistance * mouseDir;
	}

  //currentVelocity *= 0.995;
  outColor = vec4(currentVelocity, 0.0, 1.0);
	//outColor = vec4(sin((v_texCoord.x - 1.0) * 2.0), cos((v_texCoord.x - 1.0) * 2.0), 0.0, 1.0);
}
