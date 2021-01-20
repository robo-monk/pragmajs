import { Pragma, util, _p } from "../index"

export const create = {
  get template() {
    return new Pragma()
                .run(function() {
                    this.config = function(conf) {
                      let setTemplateName =`set${conf.name.capitalize()}Template`
                      let templateName =`_${conf.name}Template`

                      this[setTemplateName] = function(f){
                        this[templateName] = f
                        return this
                      }

                      if (conf.defaultSet) this[setTemplateName](conf.defaultSet)

                      this._tempOptions = {
                        set: setTemplateName,
                      }

                      this.export(
                        templateName,
                        setTemplateName,
                      )

                      this.onExport(pragma => {
                          pragma.export(templateName, setTemplateName)
                      })

                      // adopt other keys in config
                      
                      conf.name && delete conf.name
                      conf.defaultSet && delete conf.defaultSet

                      for (let [attr, val] of Object.entries(conf)) {
                          this[attr] = val
                          this.export(attr)
                          this.onExport( pragma => pragma.export(attr) )
                      }

                      return this
                    }
                })
  },

  fromObject: function(obj){
    util.log(`Creating template object from obj: [${JSON.stringify(obj)}]`)

    // if (obj._blueprint){
    //   delete obj._blueprint
    // }

    const _create = obj._create || function(partial){
      return partial
    }

    if (obj._create) delete obj._create

    let tpl = {
      defaults: {},
      isPragmaTemplate: true
    }

    tpl.setDefaults = function(obj){
      this.defaults = util.objDiff(this.defaults, obj)
      return this
    }

    for (let [key, _partial] of Object.entries(obj)){
      Object.defineProperty(tpl, key, {
        get: function() {
          return _create(_partial, tpl, ...arguments)
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
