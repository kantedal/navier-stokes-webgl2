import {Program} from "../../utils/program";
import {FLOAT_TYPE, IUniform, VEC2_TYPE, VEC3_TYPE} from "../../utils/shader";

/*
 Shader imports
 */
const classifyVoxelsFrag = require('raw-loader!glslify!./shaders/classify-voxels.frag')
const classifyVoxelsVert = require('raw-loader!glslify!./shaders/classify-voxels.vert')

export interface IClassifyVoxelsUniforms {}

export default class ClassifyVoxelsProgram extends Program<IClassifyVoxelsUniforms> {

  constructor() {
    let uniforms: IClassifyVoxelsUniforms = {}
    super(vec2.fromValues(512, 512), classifyVoxelsVert, classifyVoxelsFrag, uniforms)
  }

  render(): void {
    console.log('classify voxels')
    this._program.render()
  }
}