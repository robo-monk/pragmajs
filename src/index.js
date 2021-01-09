export * as util from "./core/util/index"

import Element from "./core/element"
import Pragma from "./core/pragma"

export { Element, Pragma } 


// API layer

const ε = function() {
  return new Element(...arguments)
}

const π = (query, html) => {
  let p = new Pragma()
  p.element = new Element(query, html)
  p.id = p.element.id
  return p
}

const _p = π
const _e = ε

export { π, ε, _e, _p }
