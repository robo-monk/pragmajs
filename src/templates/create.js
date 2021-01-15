import { util } from "../index"

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
    util.log(`Creating template object from obj: [${obj}]`)
    if (obj._blueprint){
      delete obj._blueprint
    }

    let tpl = new Map()
    for (let [key, _partial] of obj){
      tpl.set(key, _create(_partial))
    }

    return tpl
  },
  //fromFile: function(fn){
    //log(`Creating template object from file: [${fn}]`)
    //return this.fromObject(file)
  //},
  from: function(n){
    /*
     * creates template object from a JSON file or object
     */
    //if (typeof n === 'string') return this.fromFile(n)
    if (typeof n === 'object') return this.fromObject(n)

    util.throwSoft(`Could not create a template object from argument [${n}])`)
  }
}
