import {Program} from "../../utils/program";
import {FLOAT_TYPE, IUniform, TEXTURE_TYPE} from "../../utils/shader";
import {PingPongProgram} from "../../utils/ping-pong-program";

/*
 Shader imports
 */
const pressureFrag = require('raw-loader!glslify!./shaders/pressure.frag')
const pressureVert = require('raw-loader!glslify!./shaders/pressure.vert')

export interface IIntegrationUniforms {
  divergenceField: IUniform
  pressureField: IUniform
  dt: IUniform
}

export default class PressureProgram extends PingPongProgram<IIntegrationUniforms> {

  constructor() {
    let uniforms: IIntegrationUniforms = {
      divergenceField: { type: TEXTURE_TYPE, value: null },
      pressureField: { type: TEXTURE_TYPE, value: null },
      dt: { type: FLOAT_TYPE, value: 0.02 }
    }

    super(vec2.fromValues(512, 512), pressureVert, pressureFrag, uniforms)
  }

  render(divergenceField: WebGLTexture): void {
    this._uniforms.pressureField.value = this._program.texture
    this._uniforms.divergenceField.value = divergenceField
    this._program.render()
  }
}
