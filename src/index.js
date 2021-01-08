export * as util from "./core/util/index"

import Element from "./core/element"
import Pragma from "./core/pragma"

export { Element } 


// API layer

const ε = (f) => {
  return new Element(f)
}

const π = (map, parent) => {
  return new Pragma(map, parent)
}

const _p = π
const _e = ε

export { π, ε, _e, _p }
