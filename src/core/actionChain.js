export default class ActionChain {
  constructor(self){
    this.self = self
    this.actions = new Map()

    //API extension
    this.delete = this.destroy
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
    this.execAs(this.self, ...args)
  }

  destroy(...keys){
    keys.forEach(k => this.actions.delete(k))
  }

  execAs(self, ...args){
    this.forAction(function(key, act) {
      act.bind(self)(...args)
    })
  }
}
