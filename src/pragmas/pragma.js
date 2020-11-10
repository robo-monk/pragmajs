// a pragma is defined as a concept, which has an actual physical object "connected"
// with it
import $ from "jquery"

export default class Pragma {
  constructor(element=null, listeners={}){
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
  click(){
  }
  text(){
    return this.element.text()
  }
  offset(){
    return this.element.offset()
  }
  left(){
    return this.offset().left
  }
  top(){
    return this.offset().top
  }
  height(){
    return this.element.height()
  }
  width(){
    return this.element.width()
  }
  x(relative_width){
    return this.left() + this.width()/2 - relative_width/2
  }
}