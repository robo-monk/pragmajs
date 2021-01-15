import { util, _p } from "../index"

//
// var icons = {
//   _create: function() {
//     v = "ha"
//     return v
//   }
//   settings: `<path>0.3, 4943</path>`
// }

export const create = {
  fromObject: function(obj){
    util.log(`Creating template object from obj: [${JSON.stringify(obj)}]`)

    // if (obj._blueprint){
    //   delete obj._blueprint
    // }

    const _create = obj._create || function(partial){
      return partial
    }

    if (obj._create) delete obj._create

    let tpl = {}
    for (let [key, _partial] of Object.entries(obj)){
      // tpl[key] = _create(_partial)
      Object.defineProperty(tpl, key, {
        get: function() {
          return _create(_partial, ...arguments)
        }
      })
    }

    return tpl
  },
  from: function(n, _create){
    /*
     * creates template object from a JSON file or object
     */
    //if (typeof n === 'string') return this.fromFile(n)
    if (typeof n === 'object'){
      if (typeof _create === "function")
        n['_create'] = _create

      return this.fromObject(n)
    }

    util.throwSoft(`Could not create a template object from argument [${n}])`)
  }
}
