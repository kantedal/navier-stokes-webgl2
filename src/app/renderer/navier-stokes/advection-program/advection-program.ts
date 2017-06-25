import {FLOAT_TYPE, IUniform, TEXTURE_TYPE} from "../../utils/shader";
import {PingPongProgram} from "../../utils/ping-pong-program";

/*
 Shader imports
 */
const advectionFrag = require('raw-loader!glslify!./shaders/advection.frag')
const advectionVert = require('raw-loader!glslify!./shaders/advection.vert')

export interface IAdvectionUniforms {
  velocityField: IUniform
  colorField: IUniform
  dt: IUniform
}

export default class AdvectionProgram extends PingPongProgram<IAdvectionUniforms> {

  constructor() {
    let uniforms: IAdvectionUniforms = {
      velocityField: { type: TEXTURE_TYPE, value: null },
      colorField: { type: TEXTURE_TYPE, value: null },
      dt: { type: FLOAT_TYPE, value: 0.02 }
    }

    super(vec2.fromValues(512, 512), advectionVert, advectionFrag, uniforms)
  }

  initializeColorField(input: WebGLTexture) {
    this._program.texture = input;
  }

  render(velocityField: WebGLTexture): void {
    this._uniforms.colorField.value = this._program.texture
    this._uniforms.velocityField.value = velocityField
    this._program.render()
  }
}
