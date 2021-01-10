// Its like $("#id") of jquery

import ActionChain from "./actionChain"
import { 
  throwSoft,
  whenDOM,
  parseQuery,
  addClassAryTo,
  selectOrCreateDOM,
  elementFrom,
  apply
} from "./util/index"


function domify(e){
  if (e == null || e == undefined) return throwSoft(`Could not find a DOM element for ${e}`)
  console.log(e.element)
  if (e.element) return domify(e.element)
  let a = elementFrom(e)
  return a
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
      if (this.element instanceof HTMLElement) this._render()
      if (typeof innerHTML === "string") this.html(innerHTML)
      if (typeof cb === "function") cb(this.element)
    })

    whenDOM(() => this.docLoadChain.exec(this))
  }

  set element(n){
    this.nodeElement = n 
  }

  get element(){
    return this.nodeElement 
  }

  eventChains(...chains){
    for (let chain of chains){
      _newChain(chain, this) 
    }
  }
  
  _render(){
    this.renderChain.exec(this)
  }

  appendTo(where){
    this.onDocLoad(() => {
      domify(where).appendChild(this.element)
      this._render()
    })
    return this
  }

  append(e){
    this.onRender(() => {
      let d = domify(e)
      console.log(d)
      this.element.appendChild(d)
    })
    return this 
  }

  css(styles){
    this.onRender(() => {
      apply.pcss(styles, this.element)
    })
  }

  html(inner){ 
    this.onRender(() => {
      apply.html(inner, this.element)
    })
    return this
  }

  id(id){
    this.element.id = id
    return this
  }

  addClass(...classes){
    addClassAryTo(classes, this.element)
    return this
  }

  listenTo(...args){
    this.onRender(() => {
      this.element.addEventListener(...args)
    })
    return this
  }
}
