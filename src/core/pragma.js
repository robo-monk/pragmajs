import Node from "./node"
import _e from "./element"
import ActionChain from "./actionChain"
import { generateRandomKey, toHTMLAttr, log, throwSoft } from "./util/index"

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
    if (!(element instanceof Element)) return throwSoft(`Could not add ${element} as the element of [${self}]`)
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


function _isRangeBounded(range){
  return range.min != undefined && range.max != undefined
}
function _retValObj(val, set){
  return {
    val: val,
    set: set
  }
}
function _rangeBoundVal(v, range){
  v = range.min ? Math.max(range.min, v) : v
  v = range.max ? Math.min(range.max, v) : v
  // console.log(v)
  return v
  // r ? Math.max(r[0], Math.min(v, r[1])) : v
}

function _loopBoundVal(v, range){
  if (!(_isRangeBounded(range)))
    return throwSoft(`Could not loop value, since range (${JSON.stringify(range)}) is unbounded`)

  v = v > range.max ? range.min : v
  v = v < range.min ? range.max : v
  return v
}

function _processValue(v, range, _loop) {
  if (!range) return _retValObj(v, true)
  if (_loop) return _retValObj(_loopBoundVal(v, range), true)
  let r = _rangeBoundVal(v, range)
  return _retValObj(r, r==v)
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

    if (!this.element) this.as()
  }


  get _e(){ return this.element }
  get element(){ return this.elementDOM }
  set element(n) {
    // TODO check if element is of type elememtn blah blha
    // log(">> SETTING THIS DOM ELEMENT", n, this.id)
    if (n.id){
      this.id = n.id
    } else {
      n.id = this.id
    }
    this.elementDOM = n
  }

// -------------------- VALUE THINGS

  setRange(min=null, max=null){
    this.range = this.range || {}
    this.range.min = min === null ? this.range.min : min
    this.range.max = max === null ? this.range.max : max
    return this
  }

  breakLoop() { this._loopVal = false; return this }
  setLoop(min, max){
    this.setRange(min, max)
    this._loopVal = true
    return this
  }

  get value(){
    return this.v
  }
  setValue(n) { this.value = n; return this }

  set value(n) {
    let pv = _processValue(n, this.range, this._loopVal)

    if (pv.set) {
      this.v = pv.val
      this.exec()
    }
  }


//  -------------------------------

  exec() {
    this.actionChain.execAs(this, ...arguments)
    return this
  }

  set key(key){
    this._KEY = key == null ? generateRandomKey() : key
  }
  get key() { return this._KEY }

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

  on(event, cb=null){
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
  as(query=null, innerHTML){
    query = query || `div#${this.id}.pragma`
    log("this as", query)
    this.element = _e(query, innerHTML)
    return this
  }

  // FOR TEMPLATES
  addExport(exp){
    this.exports = this.exports || []
    this.exports.push(exp)
  }

  export(...attrs){
    for (let a of attrs) {
      this.addExport(a)
    }
  }

  from(pragma){
    if (pragma.exports){
      for (let attr of pragma.exports){
        this[attr] = pragma[attr]
      }
    }

    if (pragma.onExport){
      pragma.onExport(this)
    }

    return this
  }

  wireTo(pragma){
    let self = this
    pragma.do(function(){
      // console.log(this)
      // console.log(p.value)
      // this.value = pragma.value
      self.value = this.value
    })
    return this
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
    this.element.appendTo(this.parent ? this.parent.element || "body" : "body")
    return this
  }

  pragmatizeAt(query){
    this.element.appendTo(query)
    return this
  }

  addListeners(listeners){
    for (let [ev, action] of Object.entries(listeners)){
      this.on(ev).do(action)
    }
    return this
  }
}


const _hostElementAttrs = [
  "html",
  "css",
  "addClass",
  "setId",
]

for (let a of _hostElementAttrs) {
 Pragma.prototype[a] = function() {
    this.element[a](...arguments)
    return this
  }
}

const _adoptGetters = [
  // html things
  // "text",
  "offset", "text",
  'top', 'left', 'width', 'height', 'x'
]

for (let a of _adoptGetters) {
  Object.defineProperty(Pragma.prototype, a, {
    get: function() {
      return this.element[a]
    }
  })
}

 // Pragma.prototype[a] = function() {
 //    this.element[a](...arguments)
 //  }
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
