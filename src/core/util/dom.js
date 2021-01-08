function whenDOM(cb) {

  if (document.readyState === 'complete') {
    return cb()
  }

  document.onreadystatechange = () => {
    return whenDOM(cb)    
  }
}


export { whenDOM }