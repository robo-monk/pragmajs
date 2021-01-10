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
  _extend
} from "./util/index"


function domify(e){
  if (e == null || e == undefined) return throwSoft(`Could not find a DOM element for ${e}`)
  // console.log(e.element)
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


//export default class Element {
  //constructor(query, innerHTML, cb){
    //this.isPragmaElement = true

    //this.eventChains("docLoad", "render")

    //this.onDocLoad(() => {
      //this.element = elementFrom(query)
      //if (this.element instanceof HTMLElement) this._render()
      //if (typeof innerHTML === "string") this.html(innerHTML)
      //if (typeof cb === "function") cb(this.element)
    //})

    //whenDOM(() => this.docLoadChain.exec(this))
  //}

  //set element(n){
    //this.nodeElement = n 
  //}

  //get element(){
    //return this.nodeElement 
  //}

  //eventChains(...chains){
    //for (let chain of chains){
      //_newChain(chain, this) 
    //}
  //}
  
  //_render(){
    //this.renderChain.exec(this)
  //}

  //appendTo(where){
    //this.onDocLoad(() => {
      //domify(where).appendChild(this.element)
      //this._render()
    //})
    //return this
  //}

  //append(e){
    //this.onRender(() => {
      //let d = domify(e)
      //console.log(d)
      //this.element.appendChild(d)
    //})
    //return this 
  //}

  //css(styles){
    //this.onRender(() => {
      //apply.pcss(styles, this.element)
    //})
  //}

  //html(inner){ 
    //this.onRender(() => {
      //apply.html(inner, this.element)
    //})
    //return this
  //}

  //id(id){
    //this.element.id = id
    //return this
  //}

  //addClass(...classes){
    //addClassAryTo(classes, this.element)
    //return this
  //}

  //listenTo(...args){
    //this.onRender(() => {
      //this.element.addEventListener(...args)
    //})
    //return this
  //}
//}

export default function _e(query, innerHTML){
  //whenDOM(function() {
    let element = elementFrom(query)

    if (element instanceof HTMLElement){
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
    this.eventChains("docLoad", "render")
    whenDOM(() => this.docLoadChain.exec(this))
  },
  
  eventChains: function(...chains){
    for (let chain of chains){
      _newChain(chain, this) 
    }
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
  }
}


for (let [key, val] of Object.entries(elementProto)){
  HTMLElement.prototype[key] = val
}
//_extend(HTMLElement, elementProto)


