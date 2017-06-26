#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D velocityField;
uniform sampler2D voxelField;
uniform float dt;

bool isSolid(vec3 voxel) {
  return length(voxel) > 0.0;
}

void main() {
//  vec3 voxel = texture(voxelField, v_texCoord).rgb;
//  if (isSolid(voxel)) {
//    vec2 pos = v_texCoord;
//    vec2 velocity = texture(velocityField, pos).xy;
//
//    for (int step = 0; step < 60; step++) {
//      pos = pos - velocity * (dt / 6.0);
//      velocity = texture(velocityField, pos).xy;
//    }
//
//    outColor = vec4(velocity, 0.0, 1.0);
//  }
//  else {
//  	outColor = vec4(texture(velocityField, v_texCoord).xy, 0.0, 1.0);
//  }
  vec2 currentCoord = v_texCoord.xy;
  vec2 currentVelocity = texture(velocityField, currentCoord).xy;
  vec2 newVelocity = texture(velocityField, currentCoord - dt * currentVelocity).xy;

  outColor = vec4(newVelocity, 0.0, 1.0);
}
