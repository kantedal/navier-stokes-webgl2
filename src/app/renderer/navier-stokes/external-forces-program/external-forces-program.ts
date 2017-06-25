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
  mousePosition: IUniform
  previousMousePosition: IUniform
  dt: IUniform
}

export default class ExternalForcesProgram extends Program<IExternalForcesUniforms> {
  private _mousePosition: GLM.IArray
  private _previousMousePosition: GLM.IArray
  private _mouseDown: boolean

  constructor() {
    let uniforms: IExternalForcesUniforms = {
      voxels: { type: TEXTURE_TYPE, value: null },
      gridResolution: { type: VEC2_TYPE, value: [512, 512] },
      externalForce: { type: VEC2_TYPE, value: [0.0, -0.82] },
      mousePosition: { type: VEC2_TYPE, value: [0.0, 0.0]},
      previousMousePosition: { type: VEC2_TYPE, value: [0.0, 0.0]},
      dt: { type: FLOAT_TYPE, value: 0.02 }
    }

    super(vec2.fromValues(512, 512), externalForcesVert, externalForcesFrag, uniforms)

    // const mouseAbort = () => {
    //   this._mouseDown = false
    // }
    window.onmousedown = e => {
      this._mouseDown = true
      this._previousMousePosition = [0,0]
      this._mousePosition = [0,0]
    }
    window.onmouseup = e => this._mouseDown = false
    window.onabort = e => this._mouseDown = false
    window.onmouseout = e => this._mouseDown = false
    window.onmousemove = e => {
      this._previousMousePosition = this._mousePosition
      this._mousePosition = [e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight]
    }
  }

  render(voxels: WebGLTexture): void {
    if (this._mouseDown) {
      this._uniforms.mousePosition.value = this._mousePosition

      if (this._mousePosition[0] == 0 && this._mousePosition[1] == 0) {
        this._uniforms.previousMousePosition.value = this._mousePosition
      }
      else {
        this._uniforms.previousMousePosition.value = this._previousMousePosition
      }
    }
    else {
      this._uniforms.mousePosition.value = [0,0]
      this._uniforms.previousMousePosition.value = [0,0]
    }

    this._uniforms.voxels.value = voxels
    this._program.render()
  }
}
