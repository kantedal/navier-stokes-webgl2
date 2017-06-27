import {Injectable, ElementRef} from "@angular/core"
import {initContext} from "./utils/render-context"
import RenderView from "./render-view/render-view"
import ExternalForcesProgram from "./navier-stokes/external-forces-program/external-forces-program"
import ClassifyVoxelsProgram from "./navier-stokes/classify-voxels-program/classify-voxels-program";
import SelfAdvectionProgram from "./navier-stokes/self-advection-program/self-advection-program";
import LinesRenderer from "./lines-renderer/lines-renderer";
import AdvectionProgram from "./navier-stokes/advection-program/advection-program";
import DivergenceProgram from "./navier-stokes/divergence-program/divergence-program";
import PressureProgram from "./navier-stokes/pressure-program/pressure-program";
import PressureGradientProgram from "./navier-stokes/pressure-gradient-program/pressure-gradient-program";

@Injectable()
export class RenderService {
  private _canvas: any
  private _renderView: RenderView
  private _linesRenderer: LinesRenderer

  private _classifyVoxelsProgram: ClassifyVoxelsProgram
  private _externalForcesProgram: ExternalForcesProgram
  private _selfAdvectionProgram: SelfAdvectionProgram
  private _divergenceProgram: DivergenceProgram
  private _pressureProgram: PressureProgram
  private _pressureGradientProgram: PressureGradientProgram
  private _advectionProgram: AdvectionProgram

  private _time: number = 0.0

  constructor() {}

  public init(canvas: ElementRef) {
    this._canvas = canvas
    initContext(this._canvas)

    canvas.nativeElement.width = window.innerWidth
    canvas.nativeElement.height = window.innerHeight

    this._renderView = new RenderView()

    this._classifyVoxelsProgram = new ClassifyVoxelsProgram()
    this._externalForcesProgram = new ExternalForcesProgram()
    this._selfAdvectionProgram = new SelfAdvectionProgram()
    this._divergenceProgram = new DivergenceProgram()
    this._pressureProgram = new PressureProgram()
    this._pressureGradientProgram = new PressureGradientProgram()
    this._advectionProgram = new AdvectionProgram()


    this._classifyVoxelsProgram.render()
    this._externalForcesProgram.render(this._time, this._selfAdvectionProgram.renderTexture)
    this._advectionProgram.initializeColorField(this._classifyVoxelsProgram.renderTexture)

    this._linesRenderer = new LinesRenderer(256, 256, 4)

    this.render()
  }

  private render = () => {
    this._externalForcesProgram.render(this._time, this._pressureGradientProgram.renderTexture)
    this._selfAdvectionProgram.render(this._classifyVoxelsProgram.renderTexture, this._externalForcesProgram.renderTexture)
    this._divergenceProgram.render(this._selfAdvectionProgram.renderTexture)
    this._pressureProgram.render(this._divergenceProgram.renderTexture)
    this._pressureGradientProgram.render(this._pressureProgram.renderTexture, this._selfAdvectionProgram.renderTexture)

    this._advectionProgram.render(this._pressureGradientProgram.renderTexture)

    this._linesRenderer.render(this._externalForcesProgram.renderTexture)
    this._renderView.render(this._externalForcesProgram.renderTexture, this._advectionProgram.renderTexture, this._linesRenderer.texture)

    this._time += 0.02
    requestAnimationFrame(this.render)
  }
}
