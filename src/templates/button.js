import { Pragma } from "../index"

export const button = new Pragma()
                        .on("mousedown").do(function() {
                          this.value = true
                        })
                        .on("mouseup").do(function(){
                          this.vaue = false
                        })
                        .run(function(){
                          this.export('element')
                        })
