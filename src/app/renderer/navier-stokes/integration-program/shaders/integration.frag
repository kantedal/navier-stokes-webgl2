#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D velocityField;
uniform sampler2D voxels;
uniform float dt;

bool isSolid(vec3 voxel) {
  return length(voxel) > 0.0;
}

void main() {
  vec3 currentVoxel = texture(voxels, v_texCoord).xyz;

  if (isSolid(currentVoxel)) {
    vec2 newVoxelPosition = v_texCoord + dt * texture(velocityField, v_texCoord).xy;

  }

	outColor = vec4(texture(voxels, v_texCoord).rgb, 1.0);
}
