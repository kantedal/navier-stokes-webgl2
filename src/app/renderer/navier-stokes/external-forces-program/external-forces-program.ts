import {Program} from "../../utils/program";
import {FLOAT_TYPE, IUniform, TEXTURE_TYPE, VEC2_TYPE, VEC3_TYPE} from "../../utils/shader";
import MouseForce from "./mouse-force";

/*
 Shader imports
 */
const externalForcesFrag = require('raw-loader!glslify!./shaders/external-forces.frag')
const externalForcesVert = require('raw-loader!glslify!./shaders/external-forces.vert')

export interface IExternalForcesUniforms {
  voxels: IUniform
  gridResolution: IUniform
  externalForce: IUniform
  mousePosition: IUniform
  dt: IUniform
}

export default class ExternalForcesProgram extends Program<IExternalForcesUniforms> {
  private _mousePosition: GLM.IArray
  private _mouseDown: boolean

  constructor() {
    let uniforms: IExternalForcesUniforms = {
      voxels: { type: TEXTURE_TYPE, value: null },
      gridResolution: { type: VEC2_TYPE, value: [512, 512] },
      externalForce: { type: VEC2_TYPE, value: [0.0, -0.82] },
      mousePosition: { type: VEC2_TYPE, value: [0.0, 0.0]},
      dt: { type: FLOAT_TYPE, value: 0.02 }
    }

    super(vec2.fromValues(512, 512), externalForcesVert, externalForcesFrag, uniforms)

    window.onmousedown = e => this._mouseDown = true
    window.onmouseup = e => this._mouseDown = false
    window.onabort = e => this._mouseDown = false
    window.onmouseout = e => this._mouseDown = false
    window.onmousemove = e => this._mousePosition = [e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight]
  }

  render(voxels: WebGLTexture): void {
    if (this._mouseDown) {
      this._uniforms.mousePosition.value = this._mousePosition
    }
    else {
      this._uniforms.mousePosition.value = [0,0]
    }

    this._uniforms.voxels.value = voxels
    this._program.render()
  }
}
