import Node from "./node"
import Element from "./element"
import ActionChain from "./actionChain"

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
    self.element = new Element(element)
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

    this.element = this.element || new Element()
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


  exec() { 
    this.actionChain.exec(this, this.value, ...arguments)
    return this
  }

  action(cb){
    return cb(this)
  }

  set key(n){
    this.id = n 
    if (this.element) this.element.id = n
  }

  get key(){
    return this.id
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

  listenTo(...args){
      return this.element.listenTo(...args)
  }

  do(){
    this.actionChain.add(...arguments)
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
  }
}


const _adoptElementAttrs = [
  "listenTo",
  "html",
  "css",
  "addClass",
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
