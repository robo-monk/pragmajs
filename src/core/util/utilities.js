function generateRandomKey(){
  return btoa(Math.random()).substr(10, 5)
}

function objDiff(obj, edit, recursive=false){
  // TODO add recursive feature
  for (let [key, value] of Object.entries(edit)){
    // console.log(key)
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

export {
  generateRandomKey,
  objDiff,
  _extend
}

