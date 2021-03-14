import ActionChain from "../actionChain"
import { _e } from "../../index"

function rk5(){
 return Math.random().toString(36).substring(3, 6) + Math.random().toString(36).substring(5, 8)
}
function rk8(){ return rk(8)}

function rk(l=7) {
 if (l < 5) return rk5()
 return (rk5() + rk(l-5)).substring(0, l)
}

function generateRandomKey(l){
  return rk(l)
}

function aryDiff(a, b){
  return a.filter(i => b.indexOf(i)<0)
}

function bench(cb, name){
  console.time(name)
  cb()
  console.timeEnd(name)
}

function objDiff(obj, edit){
  // TODO add recursive feature
  for (let [key, value] of Object.entries(edit)){
    obj[key] = value
  }

  return obj
}

const snake2camel = str => str.replace(/([-_]\w)/g, g => g[1].toUpperCase()) 

function _extend(e, proto){
  Object.setPrototypeOf(e, objDiff(Object.getPrototypeOf(e), proto))
}

function mimic(obj, mimic, props){
  for (let prop of (props || Object.keys(mimic))){
    let desc = Object.getOwnPropertyDescriptor(mimic, prop) 
    if (!desc) break
    Object.defineProperty(obj, prop, desc)
  }
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

function _newChain(name, obj){
  let chainName = `${name}Chain`
  let eventName = `on${name.capitalize()}`

  obj[chainName] = new ActionChain(obj)

  obj[eventName] = function (cb, key) {
    obj[chainName].addWithKey(cb, key)
  }

  return {
      chainName: chainName,
      eventName: eventName
  }
}

function createChains(obj, ...chains){
  for (let chain of chains){
      _newChain(chain, obj)
  }
}

function _newEventChain(name, obj){
  let refs = _newChain(name, obj)
  let done = `is${name.capitalize()}ed`

  obj[refs.chainName].add(() => {
    obj[done] = true
  })

  obj[refs.eventName] = function (cb) {
    if (obj[done]) return cb(obj)
    obj[refs.chainName].add(cb)
  }
}

// DEPRECATE
function createEventChains(obj, ...chains){
  for (let chain of chains){
      _newEventChain(chain, obj)
  }
}

function addStyles(css, name=`injected-pragma-style`){
  _e(`style#${name}-${rk5()}`, css).appendTo('head')
}

function overwrite(object, attr, over){
  let superf = object[attr]
  object[`_${attr}`] = superf.bind(object)
  object[attr] = over
}

export {
  generateRandomKey,
  objDiff,
  aryDiff,
  _extend,
  overwrite,
  createEventChains,
  createChains,
  snake2camel,
  mimic,
  bench,
  addStyles,
  rk, rk5, rk8
}
