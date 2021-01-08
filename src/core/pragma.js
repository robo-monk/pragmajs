import Node from "./node"
import Element from "./element"

//function ifKeyThenAddToPrototype(dict, key, addition, object){
  //if (key in dict)
//}
  //

const _parseMap = {
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

  children: (self, chilren) => {
    
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
          console.log(`adding ${event} event listener to ${self}`)
          console.log(self)
          console.log(obj.callback(val))
          self.listenTo(event, () => {
            obj.callback(val)
          })
        }
      } 
    })
  }
}

export default class Pragma extends Node {
  constructor(map, parent){

    super()

    if (typeof map === "object"){
      parseMap(map, this)
    } else {
      this.key = map
    }

    this.element = this.element || new Element()
  }

  listenTo(...args){
      return this.element.listenTo(...args)
  }

  callback(cb){
    console.log("callback", cb)
    return cb(this)
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
