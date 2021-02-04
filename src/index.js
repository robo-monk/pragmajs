import _e from "./core/element"
import Pragma from "./core/pragma"
import ActionChain from "./core/actionChain"
import { _thread } from "./core/util/thread"

export { _e, Pragma, ActionChain }

// API layer

//const ε = function() {
  //return new Element(...arguments)
//}

const π = (query, opt) => new Pragma(query, opt)
const _p = π
//const _e = ε

export { π, _p }

export * as util from "./core/util/index"
export * as tpl from "./templates/index"

export { _thread } from "./core/util/thread"


const exported = [ '_e', '_p', 'Pragma', 'util', 'tpl', '_thread' ]

export function globalify() {
  let pragmaModule = (globalThis || window)["pragma"]
  if (pragmaModule !== "undefined" && pragmaModule.__esModule) {
    for (let func of exported) {
      globalThis[func] = pragmaModule[func]
    }
  } else {
    console.error("Could not globalify [pragma]")
  }
}

export function render(location){
  window.location.href = location 
}
