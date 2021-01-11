import { Pragma } from "../index"

export const button = new Pragma()
                        .as(null, "0")
                        .run(function() {
                          this.buttonTpl = (v) => v
                        })
                        .do(function() {
                          this.html(this.monitorTpl(this.value))
                        })
