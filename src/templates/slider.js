import { Pragma } from "../index"
import { create } from "./create"

export function slider(config){
  return new Pragma()
    .from(create.template.config({
      name: 'slider',
      defaultSet: config || {
        min: 0,
        max: 1000
      }
    }))
    .run(function() {
      let min = 0
      let max = 10
      let val = 5
      this.as(`<input type='range' min=${min} max=${max} value=${val}></input>`)
      this.setRange(min, max)
      this.on("input").do(function() {
        this.value = parseInt(this.element.value)
      })
      this.export(
        'element',
        'actionChain',
      )
    })
  }
