import { Pragma, _e } from "../../index"
import { rk8 } from "./index"

export class Script extends Pragma {

  static load(url, name=rk8()) {
    console.time(`${name} load`)
    return new Promise (resolve => {
      _e(`script#${name}-loader crossorigin`).appendTo('head').listenTo('load', function(){
        resolve()
        console.timeEnd(`${name} load`)
      })
      .attr('src', url)
    })
  }

}


