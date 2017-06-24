import {Program} from "../../utils/program";
import {FLOAT_TYPE, IUniform, TEXTURE_TYPE, VEC2_TYPE, VEC3_TYPE} from "../../utils/shader";

/*
 Shader imports
 */
const externalForcesFrag = require('raw-loader!glslify!./shaders/external-forces.frag')
const externalForcesVert = require('raw-loader!glslify!./shaders/external-forces.vert')

export interface IExternalForcesUniforms {
  voxels: IUniform
  gridResolution: IUniform
  externalForce: IUniform
  dt: IUniform
}

export default class ExternalForcesProgram extends Program<IExternalForcesUniforms> {

  constructor() {
    let uniforms: IExternalForcesUniforms = {
      voxels: { type: TEXTURE_TYPE, value: null },
      gridResolution: { type: VEC2_TYPE, value: [512, 512] },
      externalForce: { type: VEC2_TYPE, value: [0.0, -9.82] },
      dt: { type: FLOAT_TYPE, value: 0.02 }
    }

    super(vec2.fromValues(512, 512), externalForcesVert, externalForcesFrag, uniforms)
  }

  render(voxels: WebGLTexture): void {
    this._uniforms.voxels.value = voxels
    this._program.render()
  }
}