import {Program} from "../../utils/program";
import {FLOAT_TYPE, IUniform, TEXTURE_TYPE} from "../../utils/shader";

/*
 Shader imports
 */
const integrationFrag = require('raw-loader!glslify!./shaders/integration.frag')
const integrationsVert = require('raw-loader!glslify!./shaders/integration.vert')

export interface IIntegrationUniforms {
  velocityField: IUniform
  dt: IUniform
}

export default class IntegrationProgram extends Program<IIntegrationUniforms> {

  constructor() {
    let uniforms: IIntegrationUniforms = {
      velocityField: { type: TEXTURE_TYPE, value: null },
      dt: { type: FLOAT_TYPE, value: 0.02 }
    }

    super(vec2.fromValues(512, 512), integrationsVert, integrationFrag, uniforms)
  }

  render(): void {
    console.log('integration program')
    this._program.render()
  }
}