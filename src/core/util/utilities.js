import ActionChain from "../actionChain"

function generateRandomKey(){
  return btoa(Math.random()).substr(10, 5)
}

function objDiff(obj, edit, recursive=false){
  // TODO add recursive feature
  for (let [key, value] of Object.entries(edit)){
    obj[key] = value
  }

  return obj
}

function _extend(e, proto){
  Object.setPrototypeOf(e, objDiff(Object.getPrototypeOf(e), proto))
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
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

function createEventChains(obj, ...chains){
  for (let chain of chains){
      _newChain(chain, obj) 
  }
}
  
export {
  generateRandomKey,
  objDiff,
  _extend,
  createEventChains
}

