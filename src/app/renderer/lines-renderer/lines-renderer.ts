import {gl} from "../utils/render-context";
import Shader, {IUniform, TEXTURE_TYPE} from "../utils/shader";
import createProgram from "../utils/createProgram";

/*
 Shader imports
 */
const linesFrag = require('raw-loader!glslify!./shaders/lines.frag')
const linesVert = require('raw-loader!glslify!./shaders/lines.vert')

interface LinesUniforms {
  velocityField: IUniform
}

export default class LinesRenderer {
  private _program: WebGLProgram
  private _shader: Shader
  private _uniforms: LinesUniforms

  private _framebuffer: WebGLFramebuffer
  private _texture: WebGLTexture
  private _textureData: Uint8Array

  private _vertexBuffer: WebGLBuffer
  private _textureCoordinatesLocation: any

  private _startingPointBuffer: WebGLBuffer
  private _isStartingPointLocation: any

  constructor(private sizeX: number, private sizeY: number, private _samplingDistance: number) {
    let textureCoordinates = []
    let isStartingPoint = []

    for (let x = 0; x < sizeX; x += this._samplingDistance) {
      for (let y = 0; y < sizeY; y += this._samplingDistance) {
        textureCoordinates.push(x / sizeX)
        textureCoordinates.push(y / sizeY)

        textureCoordinates.push(x / sizeX)
        textureCoordinates.push(y / sizeY)

        isStartingPoint.push(0.0)
        isStartingPoint.push(1.0)
      }
    }

    this.resetTexture()
    this._framebuffer = gl.createFramebuffer()
    console.log(isStartingPoint.length, textureCoordinates.length)

    this._shader = new Shader(linesVert, linesFrag)
    this._uniforms = {velocityField: {type: TEXTURE_TYPE, value: null}}
    this._shader.uniforms = this._uniforms

    this._program = createProgram(gl, this._shader)

    this._isStartingPointLocation = gl.getAttribLocation(this._program, 'a_isStartingPoint')
    this._startingPointBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this._startingPointBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(isStartingPoint), gl.STATIC_DRAW)

    this._textureCoordinatesLocation = gl.getAttribLocation(this._program, 'a_texCoords')
    this._vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW)
  }

  public render(velocityField: WebGLTexture) {
    this._uniforms.velocityField.value = velocityField

    gl.useProgram(this._program)

    gl.enableVertexAttribArray(this._isStartingPointLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, this._startingPointBuffer)
    gl.vertexAttribPointer(this._isStartingPointLocation, 1, gl.FLOAT, false, 0, 0)

    gl.enableVertexAttribArray(this._textureCoordinatesLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.vertexAttribPointer(this._textureCoordinatesLocation, 2, gl.FLOAT, false, 0, 0)


    gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);

    this._shader.update()

    gl.clearColor(0.0, 0.0, 0.0, 0.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.viewport(0,0, window.innerWidth, window.innerHeight)
    gl.lineWidth(4)
    gl.drawArrays(gl.LINES, 0,  (this.sizeX * this.sizeY * 2.0) / (this._samplingDistance * this._samplingDistance))

    gl.readPixels(0, 0, window.innerWidth, window.innerHeight, gl.RGBA, gl.UNSIGNED_BYTE, this._textureData);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  public resetTexture() {
    this._texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, window.innerWidth, window.innerHeight, 0, gl.RGBA, gl.FLOAT, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this._textureData = new Uint8Array(window.innerWidth * window.innerHeight* 4);
  }

  get texture(): WebGLTexture {
    return this._texture;
  }
}