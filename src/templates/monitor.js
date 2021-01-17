import { Pragma, util } from "../index"
import { create } from "./create"

export const monitor = new Pragma()
                        .from(create.template.config({
                          name: 'monitor',
                          defaultSet: v => v
                        }))
                        .do(function() {
                          this.html(this._monitorTemplate(this.value))
                        })
                        .run(function() {
                          console.log('monitor', this)
                          this.export(
                            'element',
                            // 'setMonitorTemplate',
                            // '_monitorTemplate',
                            'actionChain'
                          )
                        })
