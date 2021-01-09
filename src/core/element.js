// Its like $("#id") of jquery

import ActionChain from "./actionChain"
import { 
  throwSoft,
  whenDOM,
  parseQuery,
  addClassAryTo,
  selectOrCreateDOM,
  elementFrom,
} from "./util/index"

import { html, css } from "./util/parsers"

function domify(e){
  if (e.isPragmaElement === true) return e.element
  return elementFrom(e)
}

function elementify(e){
  if (e == null) return document.body
  if (e.isPragmaElement === true) return e 
  return new Element(e)
}


function _newChain(name, obj){
  let chainName = `${name}Chain`
  let eventName = `on${name.capitalize()}`
  let done = `is${name.capitalize()}ed`

  obj[chainName] = new ActionChain()

  obj[chainName].add(() => {
    obj[done] = true
  })

  obj[eventName] = function (cb) {
    if (obj[done]) return cb(obj)
    obj[chainName].add(cb)
  }
}


export default class Element {
  constructor(query, innerHTML, cb){
    this.isPragmaElement = true

    this.eventChains("docLoad", "render")

    this.onDocLoad(() => {
      this.element = elementFrom(query)
      if (typeof innerHTML === "string") this.html(innerHTML)
      if (typeof cb === "function") cb(this.element)
    })

    whenDOM(() => this.docLoadChain.exec(this))
  }

  eventChains(...chains){
    for (let chain of chains){
      _newChain(chain, this) 
    }
  }

  appendTo(where){
    this.onDocLoad(() => {
      domify(where).appendChild(this.element)
      this.renderChain.exec(this)
    })
    return this
  }

  append(e){
    this.onRender(() => {
      this.element.appendChild(domify(e))
    })
    return this 
  }

  html(inner){ 
    this.onRender(() => {
      this.element.innerHTML = html(inner)
    })
    return this
  }

  addClass(...classes){
    addClassAryTo(classes, this)
    return this
  }

  listenTo(...args){
    this.onRender(() => {
      this.element.addEventListener(...args)
    })
    return this
  }
}
