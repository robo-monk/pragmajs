function generateRandomKey(){
  return btoa(Math.random()).substr(10, 5)
}

export {
  generateRandomKey
}
