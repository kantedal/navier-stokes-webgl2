import {Program} from "../../utils/program";
import {FLOAT_TYPE, IUniform, TEXTURE_TYPE} from "../../utils/shader";

/*
 Shader imports
 */
const divergenceFrag = require('raw-loader!glslify!./shaders/divergence.frag')
const divergenceVert = require('raw-loader!glslify!./shaders/divergence.vert')

export interface IDivergenceUniforms {
  velocityField: IUniform
  dt: IUniform
}

export default class DivergenceProgram extends Program<IDivergenceUniforms> {

  constructor() {
    let uniforms: IDivergenceUniforms = {
      velocityField: { type: TEXTURE_TYPE, value: null },
      dt: { type: FLOAT_TYPE, value: 0.02 }
    }

    super(vec2.fromValues(512, 512), divergenceVert, divergenceFrag, uniforms)
  }

  render(velocityField: WebGLTexture): void {
    this._uniforms.velocityField.value = velocityField
    this._program.render()
  }
}
