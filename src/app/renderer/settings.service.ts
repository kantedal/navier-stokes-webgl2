
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
@Injectable()
export class SettingsService {
  voxelResolution: BehaviorSubject<GLM.IArray> = new BehaviorSubject([256, 256])
}