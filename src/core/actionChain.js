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

  forAction(cb){
    for (let [key, action] of this.actions) {
      cb(key, action)
    }
  }

  exec(...args){
    this.forAction(function(key, act) {
      act(...args)
    })
  }

  execAs(self, ...args){
    this.forAction(function(key, act) {
      act.bind(self)(...args)
    })
  }
}
