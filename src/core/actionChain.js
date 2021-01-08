export default class ActionChain {
  constructor(){
    this.actions = new Map()
  }

  add(cb, key=null){
    key = key || this.actions.size
    this.actions.set(key, cb)
  }

  exec(...args){
    for (let [key, cb] of this.actions) {
      cb(...args)
    }
  }
}
