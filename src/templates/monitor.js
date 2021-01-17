import { Pragma } from "../index"

export const monitor = new Pragma()
                        .run(function() {
                          this.setMonitorTemplate = function(f){
                            this._monitorTemplate = f
                            return this
                          }

                          this.setMonitorTemplate(v => v)
                        })
                        .do(function() {
                          this.html(this._monitorTemplate(this.value))
                        })
                        .run(function() {
                          this.export = [
                            'element',
                            'setMonitorTemplate',
                            '_monitorTemplate',
                            'actionChain'
                          ]
                        })
