import {Program} from "../../utils/program";
import {FLOAT_TYPE, IUniform, TEXTURE_TYPE} from "../../utils/shader";

/*
 Shader imports
 */
const selfAdvectionFrag = require('raw-loader!glslify!./shaders/self-advection.frag')
const selfAdvectionVert = require('raw-loader!glslify!./shaders/self-advection.vert')

export interface IIntegrationUniforms {
  velocityField: IUniform
  voxelField: IUniform
  dt: IUniform
}

export default class SelfAdvectionProgram extends Program<IIntegrationUniforms> {

  constructor() {
    let uniforms: IIntegrationUniforms = {
      velocityField: { type: TEXTURE_TYPE, value: null },
      voxelField: { type: TEXTURE_TYPE, value: null },
      dt: { type: FLOAT_TYPE, value: 0.02 }
    }

    super(vec2.fromValues(512, 512), selfAdvectionVert, selfAdvectionFrag, uniforms)
  }

  render(voxelField: WebGLTexture, velocityField: WebGLTexture): void {
    this._uniforms.voxelField.value = voxelField
    this._uniforms.velocityField.value = velocityField
    this._program.render()
  }
}
