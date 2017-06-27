import {Program} from "../../utils/program";
import {FLOAT_TYPE, IUniform, TEXTURE_TYPE} from "../../utils/shader";

/*
 Shader imports
 */
const pressureFrag = require('raw-loader!glslify!./shaders/pressure-gradient.frag')
const pressureVert = require('raw-loader!glslify!./shaders/pressure-gradient.vert')

export interface IPressureGradientUniforms {
  velocityField: IUniform
  pressureField: IUniform
  dt: IUniform
}

export default class PressureGradientProgram extends Program<IPressureGradientUniforms> {

  constructor() {
    let uniforms: IPressureGradientUniforms = {
      velocityField: { type: TEXTURE_TYPE, value: null },
      pressureField: { type: TEXTURE_TYPE, value: null },
      dt: { type: FLOAT_TYPE, value: 0.02 }
    }

    super(vec2.fromValues(512, 512), pressureVert, pressureFrag, uniforms)
  }

  render(pressureField: WebGLTexture, velocityField: WebGLTexture): void {
    this._uniforms.pressureField.value = pressureField
    this._uniforms.velocityField.value = velocityField
    this._program.render()
  }
}
