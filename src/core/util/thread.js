export function _thread(cb) {
  let code = `
    onmessage = e => postMessage(JSON.stringify((${cb.toString()})(e.data))) 
  `  
  var blob = new Blob([code], {
    type: "application/javascript"
  })

  var worker = new Worker(URL.createObjectURL(blob))

  return function(){
      worker.postMessage(arguments)
    return new Promise(resolve=> {
      worker.addEventListener('message', m => resolve(JSON.parse(m.data)))
    })
  }
}

/*
 *
 usage:
 
     const threadedFunction = _thread(data => {
        return 'your palms are ' + data
     })
 
    threadedFunction("sweaty").then(d => console.log('heee', d))
*/
    

export function _runAsync(cb) {
  return new Promise(r => r(cb()))
}

export function runAsync(...cbs) {
  return _runAsync(() => {
    for (let cb of cbs) {
        _runAsync(cb)
    }
  })
}
