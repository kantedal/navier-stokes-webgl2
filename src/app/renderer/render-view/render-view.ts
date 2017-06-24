import Shader, {IUniform, TEXTURE_TYPE} from "../utils/shader";
import RenderTarget from "../utils/render-target";

/*
 Shader imports
 */
const baseRendererVert = require('raw-loader!glslify-loader!./shaders/render-view.vert');
const baseRendererFrag = require('raw-loader!glslify-loader!./shaders/render-view.frag');

export default class RenderView {
  private _renderTarget: RenderTarget
  private _uniforms: {[name: string]: IUniform}

  constructor() {
    let shader = new Shader(baseRendererVert, baseRendererFrag)
    this._uniforms = {
      u_texture: { type: TEXTURE_TYPE, value: null }
    }
    shader.uniforms = this._uniforms

    //this._renderTarget = new RenderTarget(shader, window.innerWidth, window.innerHeight)
    this._renderTarget = new RenderTarget(shader, 1024, 1024)
  }

  public render(texture: WebGLTexture) {
    this._uniforms['u_texture'].value = texture

    this._renderTarget.render()
  }

  public updateSize() {
    this._renderTarget.setWindowSize(window.innerWidth, window.innerHeight)
  }
}