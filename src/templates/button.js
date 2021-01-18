import { Pragma } from "../index"

export function button (){
  return new Pragma()
        .on("mousedown").do(function() {
          this.value = true
        })
        .on("mouseup").do(function(){
          this.vaue = false
        })
        .run(function(){
          this.export('element')
        })
      }
