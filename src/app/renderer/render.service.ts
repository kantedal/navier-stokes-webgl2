import {Injectable, ElementRef} from "@angular/core"
import {initContext} from "./utils/render-context"
import RenderView from "./render-view/render-view"
import ExternalForcesProgram from "./navier-stokes/external-forces-program/external-forces-program"
import ClassifyVoxelsProgram from "./navier-stokes/classify-voxels-program/classify-voxels-program";

@Injectable()
export class RenderService {
  private _canvas: any
  private _renderView: RenderView

  private _classifyVoxelsProgram: ClassifyVoxelsProgram
  private _externalForcesProgram: ExternalForcesProgram

  constructor() {}

  public init(canvas: ElementRef) {
    this._canvas = canvas
    initContext(this._canvas)

    canvas.nativeElement.width = window.innerWidth
    canvas.nativeElement.height = window.innerHeight

    this._renderView = new RenderView()

    this._classifyVoxelsProgram = new ClassifyVoxelsProgram()
    this._externalForcesProgram = new ExternalForcesProgram()

    this.render()
  }

  private render = () => {
    this._classifyVoxelsProgram.render()
    this._externalForcesProgram.render(this._classifyVoxelsProgram.renderTexture)
    this._renderView.render(this._externalForcesProgram.renderTexture)
  }
}