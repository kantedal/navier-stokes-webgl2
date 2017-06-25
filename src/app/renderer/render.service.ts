import {Injectable, ElementRef} from "@angular/core"
import {initContext} from "./utils/render-context"
import RenderView from "./render-view/render-view"
import ExternalForcesProgram from "./navier-stokes/external-forces-program/external-forces-program"
import ClassifyVoxelsProgram from "./navier-stokes/classify-voxels-program/classify-voxels-program";
import SelfAdvectionProgram from "./navier-stokes/self-advection-program/self-advection-program";
import LinesRenderer from "./lines-renderer/lines-renderer";
import AdvectionProgram from "./navier-stokes/advection-program/advection-program";

@Injectable()
export class RenderService {
  private _canvas: any
  private _renderView: RenderView
  private _linesRenderer: LinesRenderer

  private _classifyVoxelsProgram: ClassifyVoxelsProgram
  private _selfAdvectionProgram: SelfAdvectionProgram
  private _externalForcesProgram: ExternalForcesProgram
  private _advectionProgram: AdvectionProgram

  constructor() {}

  public init(canvas: ElementRef) {
    this._canvas = canvas
    initContext(this._canvas)

    canvas.nativeElement.width = window.innerWidth
    canvas.nativeElement.height = window.innerHeight

    this._renderView = new RenderView()

    this._classifyVoxelsProgram = new ClassifyVoxelsProgram()
    this._selfAdvectionProgram = new SelfAdvectionProgram()
    this._externalForcesProgram = new ExternalForcesProgram()
    this._advectionProgram = new AdvectionProgram()


    this._classifyVoxelsProgram.render()
    this._externalForcesProgram.render(this._selfAdvectionProgram.renderTexture)
    this._advectionProgram.initializeColorField(this._classifyVoxelsProgram.renderTexture)

    this._linesRenderer = new LinesRenderer(256, 256, 4)

    this.render()
  }

  private _renderCount = 0
  private render = () => {
    this._selfAdvectionProgram.render(this._classifyVoxelsProgram.renderTexture, this._externalForcesProgram.renderTexture)
    this._externalForcesProgram.render(this._selfAdvectionProgram.renderTexture)
    this._linesRenderer.render(this._externalForcesProgram.renderTexture)
    this._advectionProgram.render(this._externalForcesProgram.renderTexture)

    this._renderView.render(this._externalForcesProgram.renderTexture, this._advectionProgram.renderTexture, this._linesRenderer.texture)

    this._renderCount++
    // if (this._renderCount < 1000) requestAnimationFrame(this.render)
    requestAnimationFrame(this.render)
  }
}
