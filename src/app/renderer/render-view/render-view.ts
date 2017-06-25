import Shader, {IUniform, TEXTURE_TYPE} from "../utils/shader";
import RenderTarget from "../utils/render-target";

/*
 Shader imports
 */
const baseRendererVert = require('raw-loader!glslify-loader!./shaders/render-view.vert');
const baseRendererFrag = require('raw-loader!glslify-loader!./shaders/render-view.frag');

export interface RenderViewUniforms {
  velocityField: IUniform
  colorField: IUniform
  velocityVectors: IUniform
}

export default class RenderView {
  private _renderTarget: RenderTarget
  private _uniforms: RenderViewUniforms

  constructor() {
    let shader = new Shader(baseRendererVert, baseRendererFrag)
    this._uniforms = {
      velocityField: { type: TEXTURE_TYPE, value: null },
      colorField: { type: TEXTURE_TYPE, value: null },
      velocityVectors: { type: TEXTURE_TYPE, value: null }
    }
    shader.uniforms = this._uniforms

    this._renderTarget = new RenderTarget(shader, window.innerWidth, window.innerHeight)
  }

  public render(velocityField: WebGLTexture, colorField: WebGLTexture, velocityVectors: WebGLTexture) {
    this._uniforms.velocityField.value = velocityField
    this._uniforms.colorField.value = colorField
    this._uniforms.velocityVectors.value = velocityVectors

    this._renderTarget.render()
  }

  public updateSize() {
    this._renderTarget.setWindowSize(window.innerWidth, window.innerHeight)
  }
}
