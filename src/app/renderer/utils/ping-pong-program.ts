
import Shader from './shader'
import PingPongFBO from "./pingpong-fbo";

export abstract class PingPongProgram<UniformType> {
  protected _program: PingPongFBO
  protected _shader: Shader
  protected _uniforms: UniformType

  constructor(resolution: GLM.IArray, vertexShader: any, fragmentShader: any, uniforms: UniformType) {
    this._shader = new Shader(vertexShader, fragmentShader)

    this._uniforms = uniforms
    this._shader.uniforms = uniforms

    this._program = new PingPongFBO(this._shader, resolution[0], resolution[1])
  }

  abstract render(input1?: WebGLTexture, input2?: WebGLTexture, input3?: WebGLTexture): void

  get renderTexture(): WebGLTexture { return this._program.texture }
  get textureData(): Uint8Array { return this._program.textureData }
}