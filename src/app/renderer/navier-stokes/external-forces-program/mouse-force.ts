
export default class MouseForce {
  private _currentForce: GLM.IArray


  constructor() {
    window.onmousemove = e => {
      console.log(e)
    }
  }

}