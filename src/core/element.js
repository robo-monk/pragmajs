// Its like $("#id") of jquery

import { whenDOM, parseQuery } from "./util/index"
import ActionChain from "./actionChain"
import { throwSoft, util } from "./util/index"

function _matchAry(query, re){
  return (query.match(re) || []).length
}

function selectOrCreateDOM(query){
  let e = document.querySelector(query)
  if (e) return e
  let q = parseQuery(query)
  return document.createElement(q.tag || "div")
}

function elementFrom(e){
  if (typeof e === "string") return selectOrCreateDOM(e)
  return e
}

function domify(e){
  if (e.isPragmaElement === true) return e.element
  return elementFrom(e)
}

function elementify(e){
  if (e == null) return document.body
  if (e.isPragmaElement === true) return e 
  return new Element(e)
}

function html(str){
  return str
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
      console.log(this.element)
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
    console.log("html", inner)
    this.onRender(() => {
      console.log("html", inner)
      this.element.innerHTML = html(inner)
    })
    return this
  }

  listenTo(...args){
    this.onRender(() => {
      this.element.addEventListener(...args)
    })
    return this
  }

/*
 *  whenDocLoad(cb){
 *    if (this.element) return cb(this)
 *    if (!this.whenDocLoadChain) this.whenDocLoadChain = new ActionChain()
 *    this.whenDocLoadChain.add(cb)
 *  }
 *
 *
 *  whenInDOM(cb){
 *    if (this.element) return cb(this)
 *    if (!this.whenElementChain) this.whenElementChain = new ActionChain()
 *    this.whenElementChain.add(cb)
 *  }
 */

}



// Element.prototype.generateKey = () => { btoa(Math.random()).substr(10, 5) }
//
