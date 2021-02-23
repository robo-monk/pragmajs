import Node from "./node"
import _e from "./element"
import ActionChain from "./actionChain"
import { generateRandomKey, toHTMLAttr, createEventChains, suc, log, throwSoft } from "./util/index"
import { util } from ".."

const _parseMap = {

  parent: (self, parent) => {
    self.parent = parent
  },

  value: (self, v) => {
    self.value = v
  },

  key: (self, key) => {
    self.key = key
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
    createEventChains(this, 'export')

    this.actionChain = new ActionChain()

    this.implements = new Set
    this.implements.add('pragma')

    // console.log("-------------")
    if (typeof map === "object"){
      parseMap(map, this)
    } else {
      this.key = map
    }

    if (!this.element) this.as()
  }


  get _e(){ return this.element }

  setElement(e){
    this.elementDOM = e
    return this
  }

  get element(){ return this.elementDOM }
  set element(n) {
    this.setElement(n)
    // TODO check if element is of type elememtn blah blha
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

  get dv(){
    return this.v - this.lastValue
  }
  get value(){
    return this.v
  }

  setValue(n) { this.value = n; return this }
  set value(n) {
    let pv = _processValue(n, this.range, this._loopVal)

    if (pv.set) {
      this.lastValue = this.v
      this.v = pv.val
      this.exec()
    }
  }

//  -------------------------------

  exec() {
    this.actionChain.execAs(this, ...arguments)
    return this
  }

  setKey(key) { this.key = key; return this }

  set key(key){
    // console.log('setting key to ', key)
    this._KEY = key == null ? generateRandomKey() : key
  }

  get key() { return this._KEY }

  get id() {
    return this.element ? this.element.id : null
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
    query = query || `div#${toHTMLAttr(this.key)}.pragma`
    // this.element = _e(query, innerHTML)
    this.setElement(_e(query, innerHTML))
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
  
  onValueChange(){
    this.do(arguments)
    return this
  }

  do(){
    this.actionChain.add(...arguments)
    return this
  }


  // EXTEND

  extend(attr, newer){
    util.overwrite(this, attr, newer)
    return this
  }

  // RUN SCRIPTS WITH THIS SCOPE

  implement(...objs){
    objs.forEach(obj => {
      let runnable = null
      if (typeof obj === 'function') {
        runnable = obj().run || obj 
      } else if (obj.run) {
        runnable = obj.run
      } else {
        return util.throwSoft(`no runnable found when trying to implement ${obj}`)
      }

      this.run(runnable)
      this.implements.add(obj.name || util.rk8())
    })

    return this
  }

  run(...scripts){
    let sample = scripts[0]
    if (typeof sample === 'function'){
      this._runAry(scripts)
    } else if (typeof sample === 'object'){
      this._runAry(Object.values(sample))
    } else {
      throwSoft(`Could not run [${scripts}] as [${this}]`)
    }
    return this
  }

  _runAry(scripts){
    for (let script of scripts){
      this.runAs(script)
    }
  }

  runAs(script){
    return script.bind(this)()
  }
  
  containAry(childs, action='append'){
    for (let child of childs) {
      super.add(child)

      if (child.isRendered){
        throwSoft(`[${child}] is already appended`)
      }else{
        this.element[action](child)
      }
      
    }
    return this
  }

  contain(...childs){
    return this.containAry(childs)
  }

  pragmatize(){
    this.element.appendTo(this.parent ? this.parent.element || "body" : "body")
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
  "removeClass",
  "toggleClass",
  "setId",
  'append',
  'prepend',
  'appendTo',
  'prependTo',
  'listenTo',
  'setData'
]

for (let a of _hostElementAttrs) {
 Pragma.prototype[a] = function() {
    this.element[a](...arguments)
    return this
  }
}

const _adoptElementAttrs = [
  'getData'
]

for (let a of _adoptElementAttrs) {
 Pragma.prototype[a] = function() {
    return this.element[a](...arguments)
  }
}

const _adoptGetters = [
  // html things
  // "text",
  "offset", "text",
  'top', 'left', 'width', 'height', 'x',
  'classArray'
]

for (let a of _adoptGetters) {
  Object.defineProperty(Pragma.prototype, a, {
    get: function() {
      return this.element[a]
    }
  })
}


// Mousetrap integration TODO improve this
if (!globalThis.pragmaSpace) globalThis.pragmaSpace = {}
globalThis.pragmaSpace.integrateMousetrap = function(trap){
  if (typeof trap === 'function') {
   Pragma.prototype.bind = function(key, f, on=undefined){
     let self = this
      trap.bind(key, function(){
        return self.runAs(f)
      }, on)
      return this
   }

   globalThis.pragmaSpace.mousetrapIntegration = true
   suc('Mousetrap configuration detected! Extended Pragmas to support .bind() method!')
 }
}

try {
  globalThis.pragmaSpace.integrateMousetrap(Mousetrap)
} catch (e) {
  log(`Tried to integrate extensions, but failed. To disable,
  this attempt: globalThis.pragmaSpace.integrate3rdParties = false`)
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
