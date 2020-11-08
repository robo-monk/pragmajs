// a pragma is defined as a concept, which has an actual physical object "connected"
// with it
import $ from "jquery"

export default class Pragma {
  constructor(element, listeners={}){
    this.element = $(element)
    this.children = []
    this.setup_listeners(listeners)
  }
  add(spragma){
    this.children.push(spragma)
  }
  setup_listeners(listeners){
    Object.entries(listeners).forEach(([on, cb]) => {
      this.element.on(on, () => cb())
    })
  }
  text(){
    return this.element.text()
  }
}