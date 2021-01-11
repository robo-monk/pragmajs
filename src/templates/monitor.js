import { Pragma } from "../index"

export const monitor = new Pragma()
                        .as(null, "0")
                        .run(function() {
                          this.monitorTpl = (v) => v
                        })
                        .do(function() {
                          this.html(this.monitorTpl(this.value))
                        })
