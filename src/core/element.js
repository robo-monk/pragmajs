// Its like $("#id") of jquery

import ActionChain from "./actionChain"
import {
  throwSoft,
  whenDOM,
  parseQuery,
  addClassAryTo,
  selectOrCreateDOM,
  elementFrom,
  apply,
  _extend,
  createEventChains
} from "./util/index"


function domify(e){
  if (e == null || e == undefined) return throwSoft(`Could not find a DOM element for ${e}`)
  if (e.element) return domify(e.element)
  let a = elementFrom(e)
  return a
}

// function elementify(e){
//   if (e == null) return document.body
//   if (e.isPragmaElement === true) return e
//   return new Element(e)
// }

function convertShadowToLight(e){
  var l = document.createElement('template')
  l.appendChild(e.cloneNode(true))
  return l.firstChild
}

export default function _e(query, innerHTML){
    let element = domify(query)

    if (element.constructor === DocumentFragment){
      element = convertShadowToLight(element)
    }

    if (element instanceof Element){
      element.init()
      element._render()
    }

    if (typeof innerHTML === "string") element.html(innerHTML)
    //if (typeof cb === "function") cb(element)
    return element
  //})
}

const elementProto = {
  init: function(){
    this.isPragmaElement = true
    //this.eventChains("docLoad", "render")
    createEventChains(this, "docLoad", "render")
    whenDOM(() => this.docLoadChain.exec(this))
  },

  _render: function(){
    this.renderChain.exec(this)
  },

  appendTo: function(where){
    this.onDocLoad(() => {
      domify(where).appendChild(this)
      this._render()
    })
    return this
  },

  prependTo: function(where){
    this.onDocLoad(() => {
      domify(where).prepend(this)
      this._render()
    })
    return this
  },

  append: function(e){
    this.onRender(() => {
      let d = domify(e)
      this.appendChild(d)
    })
    return this
  },

  css: function(styles){
    this.onRender(() => {
      apply.pcss(styles, this)
    })
    return this
  },

  html: function(inner){
    this.onRender(() => {
      apply.html(inner, this)
    })
    return this
  },

  setId: function(id){
    this.id = id
    return this
  },

  addClass: function(...classes){
    addClassAryTo(classes, this)
    return this
  },

  listenTo: function(...args){
    this.onRender(() => {
      this.addEventListener(...args)
    })
    return this
  },

  attr: function(a, val=undefined){
    if (typeof a === 'string'){
      if (val === undefined) return this.getAttribute(a)
      const key = a
      a = {}
      a[key] = val
    }

    for (let [attr, val] of Object.entries(a)){
      this.setAttribute(attr, val)
    }

    return this
  },

  find: function(){
    return this.querySelector(...arguments)
  },

  findAll: function(query){
    return this.querySelectorAll(query)
  },

  rect: function rect(){
    return typeof this.getBoundingClientRect === "function" ?
            this.getBoundingClientRect() : {}
  },

  offset: function offset(){
    var rect = this.rect()
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    }
  },

  x: function(relative_width){
    return this.left + this.width/2 - relative_width/2
  }
}

const elementGetters = {
  top:  function(){
    return this.offset().top
  },
  left: function(){
    return this.offset().left
  },
  width: function(){
    return this.rect().width
  },
  height: function(){
    return this.rect().height
  },
  text: function(){
    return this.textContent
  },
}

for (let [key, val] of Object.entries(elementProto)){
  Element.prototype[key] = val
}

for (let [key, val] of Object.entries(elementGetters)){
  Object.defineProperty(Element.prototype, key, {
    get: val,
    configurable: true
  })
}

// extend element instead of this weird ass thing
