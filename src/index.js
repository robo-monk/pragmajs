import _e from "./core/element"
import Pragma from "./core/pragma"
import ActionChain from "./core/actionChain"

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


const exported = [ '_e', '_p', 'Pragma', 'util', 'tpl' ]

export function globalify(options){
  if (typeof pragma !== "undefined" && pragma.__esModule){
    for (let func of exported){
      globalThis[func] = pragma[func]
    }
  }else{
    console.error("Could not globalify [pragma]")
  }
}
