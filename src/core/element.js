// Its like $("#id") of jquery

import { whenDOM } from "./util/index"
import ActionChain from "./actionChain"

function elementFrom(e){
  if (typeof e === "string") return document.body.querySelector(e)
  return e
}

export default class Element {
  constructor(e, cb){
    whenDOM(() => {
      this.element = elementFrom(e)
      if (this.whenElementChain) this.whenElementChain.exec(this)
      if (typeof cb === "function") cb(this.element)
    })
  }

  listenTo(...args){
    this.whenInDOM(() => {
      this.element.addEventListener(...args)
    })
  }

  whenInDOM(cb){
    if (this.element) return cb(this)
    if (!this.whenElementChain) this.whenElementChain = new ActionChain()
    this.whenElementChain.add(cb)
  }
}

// Element.prototype.generateKey = () => { btoa(Math.random()).substr(10, 5) }
