import FBO from './fbo'
import Shader from './shader'

export abstract class Program<UniformType> {
  protected _program: FBO
  protected _shader: Shader
  protected _uniforms: UniformType

  constructor(resolution: GLM.IArray, vertexShader: any, fragmentShader: any, uniforms: UniformType) {
    this._shader = new Shader(vertexShader, fragmentShader)

    this._uniforms = uniforms
    this._shader.uniforms = uniforms

    this._program = new FBO(this._shader, resolution[0], resolution[1])
  }

  abstract render(input1?: WebGLTexture, input2?: WebGLTexture, input3?: WebGLTexture): void

  get renderTexture(): WebGLTexture { return this._program.texture }
  get textureData(): Uint8Array { return this._program.textureData }
}