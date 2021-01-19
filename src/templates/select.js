import { Pragma } from "../index"
import { create } from "./create"

const defaults = {
  onOptionCreate: function(self, option){
    self.contain(option)
  },
  optionTemplate: function(option){
      return new Pragma(option)
              .html(option)
              .addClass('pragma-click')
              .on('click').do(function(){
                this.parent.value = this.key
              })
  }
}

export function select(config){
  return new Pragma()
    .from(create.template.config({
      name: 'select',
      defaultSet: config.options
    }))
    .run(function() {
      config.onOptionCreate = config.onOptionCreate || defaults.onOptionCreate
      config.optionTemplate = config.optionTemplate || defaults.optionTemplate

      if (this._selectTemplate.constructor === Array){
        for (let el of this._selectTemplate){
          config.onOptionCreate(this, config.optionTemplate(el))
        }
      }else{
        for (let [ key, val ] of Object.entries(this._selectTemplate)){
          const pair = {}; pair[key] = val
          config.onOptionCreate(this, config.optionTemplate(key, val), pair)
        }
      }

      this.export(
        'element',
        'actionChain',
        'childMap'
      )
    })
  }
