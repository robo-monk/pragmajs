import _e from "./core/element"
import Pragma from "./core/pragma"
import ActionChain from "./core/actionChain"

export { _e, Pragma, ActionChain }
export { Script } from "./core/util/script"

// API layer

//const ε = function() {
  //return new Element(...arguments)
//}

const π = (query, opt) => new Pragma(query, opt)
const _p = π
//const _e = ε

export { π, _p }

export * as util from "./core/util/index"

export { _thread, runAsync, _runAsync } from "./core/util/thread"

const exported = [ '_e', '_p', 'Pragma', 'util', '_thread' ]

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

// function html(){

export function html(strings, ...values) {
  let _html = values.reduce((finalString, value, index) => {
    return `${finalString}${value}${strings[index + 1]}`
  }, strings[0])

  return _e(_html.trim())
}

export function block(strings, ...values) {
  let _html = html(strings, ...values) 
  return _p().as(_html)
}

export function render(location){
  window.location.href = location 
}
