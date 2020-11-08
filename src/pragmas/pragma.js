// a pragma is defined as a concept, which has an actual physical object "connected"
// with it
import $ from "jquery"

export default class Pragma {
  constructor(element, listeners={}){
    this.element = $(element)
    console.log(this.element)
    this.setup_listeners(listeners)
  }
  setup_listeners(listeners){
    Object.entries(listeners).forEach(([on, cb]) => {
      this.element.on(on, () => cb())
    })
  }
}