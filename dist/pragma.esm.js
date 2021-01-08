function throwSoft (desc, potential=null, fixes=['rerun the code 10 times'], trigger=null, force=false) {
  if (_deving && !force) return null
  
  console.error(`%c 🧯 pragma.js  %c \n
      encountered a soft error 🔫 %c \n
      \n${trigger ? `Triggered by: [${trigger.key} ${trigger}]` :``}
      \n${desc} %c\n
      \n${ potential!=null ? `Potential ${potential}: \n\t${fixes.join("\n\t")}` : '' }
      `, "font-size:15px", "font-size: 12px;", "color:whitesmoke", "color:white");
}

function whenDOM(cb) {

  if (document.readyState === 'complete') {
    return cb()
  }

  document.onreadystatechange = () => {
    return whenDOM(cb)    
  };
}

function generateRandomKey(){
  return btoa(Math.random()).substr(10, 5)
}

const _deving = process.env.NODE_ENV === 'development';

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  _deving: _deving,
  throwSoft: throwSoft,
  whenDOM: whenDOM,
  generateRandomKey: generateRandomKey
});

// Its like $("#id") of jquery

function elementFrom(e){
  if (typeof e === "string") return document.querySelector(e)
  return e
}

class Element {
  constructor(e, cb){
    this.whenDom = whenDOM;
    whenDOM(() => {
      this.element = elementFrom(e);
      this.__proto__.listenTo = this.element.addEventListener;
      if (typeof cb === "function") cb(this.element);
    });
  }
}

// Element.prototype.generateKey = () => { btoa(Math.random()).substr(10, 5) }

// recursively connected with other nodes
class Node {
  constructor() {
    this.childMap = new Map();

    // API
    this.containsKey = this.childMap.has;
  }

  get kidsum() { return this.childMap.size }
  get hasKids() { return this.kidsum > 0 }
  get shape() { return this.shapePrefix() }

  get master() {
    if (this.parent == null || this.parent.parent == null) return this.parent
    return this.parent.master
  }

  get children() {
    return Array.from(this.childMap.values())
  }

  get depthKey() {
    if (this.parent) {
      return this.parent.depthKey + "<~<" + this.key
    }
    return this.key
  }

  get allChildren() {
    if (!this.hasKids) return null
    let childs = this.children;
    for (let child of childs) {
      let descs = child.allChildren;
      if (descs) childs = childs.concat(descs);
    }
    return childs
  }

  find(key) {
    // recursively find a key
    // return false
    if (this.childMap.has(key)) return this.childMap.get(key)
    for (let [k, value] of this.childMap) {
      let vv = value.find(key);
      if (vv) return vv
    }
  }

  add(spragma) {
    if (this.childMap.has(spragma.key)) {
      spragma.key = spragma.key + "~";
      return this.add(spragma)
    }
    spragma.parent = this;
    this.childMap.set(spragma.key, spragma);
    // this.children.push(spragma)
  }

  shapePrefix(prefix = "") {
    let shape = `${prefix}| ${this.type} - ${this.key} \n`;
    if (this.hasKids) {
      prefix += "| ";
      for (let child of this.children) {
        shape += child.shapePrefix(prefix);
      }
    }
    return shape
  }
}

//function ifKeyThenAddToPrototype(dict, key, addition, object){
  //if (key in dict)
//}
  //

const _parseMap = {
  value: (self, v) => {
    self.value = v;    
  },

  id: (self, id) => {
    self.id = id;
  },

  class: (self, className) => {
    self._class = className;
  },

  element: (self, element) => {
    self.element = new Element(element);
  },

  children: (self, chilren) => {
    
  },

  childTemplate: (self, temp) => {
    
  }
};

function parseMap(map, obj) {
  let _notParsed = new Map();

  for (let [key, val] of Object.entries(map)){
    if (_parseMap.hasOwnProperty(key)){
      _parseMap[key](obj, val);
      continue
    }
    _notParsed.set(key, val);
  }

  // add listener callbacks
  if (obj.element) {
    obj.element.whenDOM(() => { 
      for (let [key, val] of _notParsed) {
        key = key.toLowerCase();
        if (key.includes("on")){
          let event = key.split("on")[1].trim();
          console.log(`adding ${event} event listener to ${obj.element}`);
          console.log(obj.element);
          obj.element.listenTo(event, () => callback(val));
        }
      } 
    });
  }
}

class Pragma extends Node {
  constructor(map, parent){

    super();

    if (typeof map === "object"){
      parseMap(map, this);
    } else {
      this.key = map;
    }

  }

  callback(cb){
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

// API layer

const ε = (f) => {
  return new Element(f)
};

const π = (map, parent) => {
  return new Pragma(map, parent)
};

const _p = π;
const _e = ε;

export { Element, _e, _p, index as util, ε, π };
