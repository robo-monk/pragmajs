import { Pragma } from "../index"
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
            this.export(
              'element',
              'actionChain'
            )
          })
}


/*
 *use: 
 *let monitor = _p('tv')
 *  .setValue(0)
 *  .from(tpl.monitor())
 *  .setMonitorTemplate(
 *    v => `${v} second${v == 1 ? ' has' : 's have'} passed`)
 *  .pragmatizeAt("#paper")
 *  .setLoop(0, 10)
 *
 */