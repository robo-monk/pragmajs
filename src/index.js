export * as util from "./core/util/index"

import _e from "./core/element"
import Pragma from "./core/pragma"

export { _e, Pragma } 


// API layer

//const ε = function() {
  //return new Element(...arguments)
//}

const π = (query, html) => {
  let p = new Pragma()
  p.element = _e(query, html)
  p.id = p.element.id
  return p
}

const _p = π
//const _e = ε

export { π, _p }
