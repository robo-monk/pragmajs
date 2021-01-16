if (!globalThis.pragmaSpace) globalThis.pragmaSpace = {} // initialize Pragma Space # TODO put this somewhere else
globalThis.pragmaSpace.dev =  globalThis.pragmaSpace.dev
    || (typeof process !== "undefined" && process.env && process.env.NODE_ENV === 'development')

export function _deving(){
  return globalThis.pragmaSpace.dev
}

export * from "./log"
export * from "./dom"
export * from "./utilities"
export * from "./parsers"
