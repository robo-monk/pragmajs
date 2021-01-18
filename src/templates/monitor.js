import { Pragma, util } from "../index"
import { create } from "./create"

export function monitor(config){
  return new Pragma()
          .from(create.template.config({
            name: 'monitor',
            defaultSet: config || (v => v)
          }))
          .do(function() {
            this.html(this._monitorTemplate(this.value))
          })
          .run(function() {
            console.log('monitor', this)
            this.export(
              'element',
              'actionChain'
            )
          })
}
