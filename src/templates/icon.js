import { create } from "./create"
import { _p } from "../index"

export function icons(iconSet){
  return create.from(iconSet,
    _iconSVG => _p().run(
      function(){
        this.element = _e(_iconSVG)
        this.export = ['element']
    })
  )
}

export function icon(){

}
