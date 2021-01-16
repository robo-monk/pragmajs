import { create } from "./create"
import { fillSVG } from "../core/util/index"
import { _p } from "../index"

function applyDefaults(el, d){
  if (d.fill){
    fillSVG(el, d.fill)
    delete d.fill
  }
  return el.attr(d)
}

export function icons(iconSet){
  return create.from(iconSet,
    (_iconSVG, tpl) => _p().run(
      function(){
        this.element = applyDefaults(_e(_iconSVG), tpl.defaults)
        this.export = ['element']
    })
  )
}

export function icon(){

}
