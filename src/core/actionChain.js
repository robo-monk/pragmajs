export default class ActionChain {
  constructor(){
    this.actions = new Map()
  }

  addWithKey(cb, key=null){
    key = key || this.actions.size
    this.actions.set(key, cb)
  }

  add(...cbs){
    for (let cb of cbs){
      this.addWithKey(cb)
    }
  }

  exec(...args){
    for (let [key, cb] of this.actions) {
      cb(...args)
    }
  }
}
