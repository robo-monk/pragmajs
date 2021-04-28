import { html, _e } from "../../index"
import { rk5 } from "./index"

export class Script {
  static map = new Set

  static load(src, _name=rk5()) {
    return new Promise (resolve => {
      console.time(`[${_name}] ${src} load`)
      let name = `${_name}-script`

      if (Script.map.has(src) || _e('head').findAll(`#${name}`).length != 0) return resolve()

      Script.map.add(src)

      let element = html`
        <script id="${name}" crossorigin src="${src}"></script>
      `.appendTo('head').listenTo('load', function() {
        resolve(element)
        console.timeEnd(`[${name}] ${src} load`)
      })
    })
  }
}


