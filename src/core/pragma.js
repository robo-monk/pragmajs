import Node from "./node"
import _e from "./element"
import ActionChain from "./actionChain"
import { generateRandomKey, toHTMLAttr } from "./util/index"

const _parseMap = {

  parent: (self, parent) => {
    self.parent = parent
  },

  value: (self, v) => {
    self.value = v    
  },

  id: (self, id) => {
    self.id = id
  },

  class: (self, className) => {
    self._class = className
  },

  element: (self, element) => {
    if (!(element instanceof HTMLElement)) return throwSoft(`Could not add ${element} as the element of [${self}]`)
    self.element = element
  },

  children: (self, children) => {
    if (children.constructor == Array) return self.buildAry(children)
    self.build(children)
  },

  childTemplate: (self, temp) => {
    
  }
}

function parseMap(map, obj) {
  let _notParsed = new Map()

  for (let [key, val] of Object.entries(map)){
    if (_parseMap.hasOwnProperty(key)){
      _parseMap[key](obj, val)
      continue
    }
    _notParsed.set(key, val)
  }

  // add listener callbacks
  if (obj.element) {
    obj.element.whenInDOM((self) => { 
      for (let [key, val] of _notParsed) {
        key = key.toLowerCase()
        if (key.includes("on")){
          let event = key.split("on")[1].trim()
          self.listenTo(event, () => {
            obj.action(val)
          })
        }
      } 
    })
  }
}

export default class Pragma extends Node {
  constructor(map, parent){
    super()

    this.actionChain = new ActionChain()

    if (typeof map === "object"){
      parseMap(map, this)
    } else {
      this.key = map
    }

    this.key = this.key || generateRandomKey()
    this.element = this.element || _e(`#${this.id}`) 
  }


  set value(n) {

    function _processValue(v) {
      return v
    }

    this.v = _processValue(n)
    this.exec()
  }

  get value(){
    return this.v
  }

  setValue(n){ this.value = n; return this }

  exec() { 
    this.actionChain.execAs(this, ...arguments)
    return this
  }

  set id(n) {
    this.key = n 
    if (this.element) this.element.id = this.id 
  }
    
  get id() {
    return toHTMLAttr(this.key)
  }

  buildAry(aryOfMaps){
    for (let map of aryOfMaps){
      this.add(new Pragma(map, this))
    }
    return this
  }

  build(...maps) {
    return this.buildAry(maps)
  }

  on(event){
    var self = this
    return {
      do: function(cb){
        self.element.listenTo(event, () => {
          self.run(cb)
        })
        return self
      }
    }
  }

  // FOR HTML DOM
  as(query=null, innerHTML=""){
    query = query || `div#${this.id}.pragma`
    this.element = _e(query, innerHTML)
    return this
  }

  // FOR TEMPLATES
  from(pragma){
    
  }

  // ADD SCRIPT TO RUN WHEN VALUE CHANGES
  do(){
    this.actionChain.add(...arguments)
    return this
  }


  // RUN SCRIPTS WITH THIS SCOPE
  run(...scripts){
    for (let script of scripts){
      script.bind(this)()
    }
    return this
  }

  contain(...childs){
    for (let child of childs) {
      super.add(child)
      if (child.isRendered){
        throwSoft(`[${child}] is already appended`)
      }else{
        this.element.append(child)
      }
    }
    return this
  }

  pragmatize(){
    this.element.appendTo(this.parent.element)
    return this
  }

  pragmatizeAt(query){
    console.log("pragmatizing", this.element, "to", query)
    this.element.appendTo(query)
    return this 
  }
}


const _adoptElementAttrs = [
  "html",
  "css",
  "addClass",
  "setId"
]

for (let a of _adoptElementAttrs) {
 Pragma.prototype[a] = function() {
    this.element[a](...arguments)
    return this
  } 
}


/*
 *pragmaMap = {
 *  id: "",
 *  class: "",
 *  value: 0,
 *  elements: [],
 *  element: "" / dom,
 *  onSet: () => {
 *
 *  },
 *  onClick: () => {
 *
 *  }
 *}
 */
