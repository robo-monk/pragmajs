function generateRandomKey(){
  return btoa(Math.random()).substr(10, 5)
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export {
  generateRandomKey
}

