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
    return key
  }

  add(...cbs){
    let keys = []
    for (let cb of cbs){
      keys.push(this.addWithKey(cb))
    }

    return keys.length > 1 ? keys : keys[0]
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
    this.forAction((key, act) => {
      let retVal = null

      if (typeof act.bind === 'function'){
        retVal = act.bind(self)(...args)
      } else {
        retVal = act(...args)
      }

      if (typeof retVal === 'function'){
        // TODO make this a class
        
        let self = {
          key: key,
          action: act,
          replaceWith: cb => {
            // TODO implement
          },
          selfDestruct: () => {
            this.destroy(key) 
          }
        }

        retVal(self)
      }
    })
  }
}
