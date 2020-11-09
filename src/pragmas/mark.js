// mark is responsible for marking words in the screen
import $ from "jquery"
import Pragma from "./pragma"
import anime from "animejs"

export default class Mark extends Pragma {
  constructor(parent) {
    super($("<marker></marker>"))
    this.element.css({
      'position': 'absolute',
      'outline': 'solid 0px red',
      'background-color': '#FFDf6C',
      'width': '10px',
      'height': '20px',
      'z-index': '10',
      'opacity': '100%',
      'mix-blend-mode': 'darken',
      'border-radius': '3px'
    })
    this.parent = parent
    this.parent.append(this.element)
    this.isBeingSummoned = false
    this.element.width("180px")
  }

  pause(){
    if (this.current_anime){
      this.current_anime.remove('marker')
      this.isBeingSummoned = false
    }
  }
  moveTo(blueprint, duration, complete=(()=>{})){
    if (this.isBeingSummoned) return new Promise((resolve, reject)=>resolve());
    return new Promise((resolve, reject) => {
      this.isBeingSummoned = true
      this.current_anime = anime({
          targets: 'marker',
          left: blueprint.left,
          top: blueprint.top,
          height: blueprint.height,
          easing: blueprint.ease || 'easeInOutExpo',
          duration: duration,
          complete: (anim) => {
            this.isBeingSummoned = false
            complete()
            resolve()
          }
      })
    })
  }
  mark(word, time=200, ease="easeInOutExpo"){
    return this.moveTo({ 
        top: word.top(), 
        left: word.x(this.width()),
        height: word.height(),
        ease: ease
      }, time, ()=>{
        console.log(`FROM MARK -> marked ${word.text()}`)
      })
  }
  
  guide(word){
    return new Promise((resolve, reject) => { 
      let first_transition = word.first_in_line() ? 500 : this.last_marked ? this.last_marked.time()*.4 : 0
      let first_ease = word.first_in_line() ? "easeInOutExpo" : "linear"
      return  this.moveTo({ 
                top: word.top(), 
                left: word.x(this.width()) - word.width()/2,
                height: word.height(), ease: first_ease
              }, first_transition)
              .then(() => { 
                this.mark(word, word.time()*.6, "linear").then(()=>{
                  this.last_marked = word
                  resolve()
                }) 
             })
      })
  }
}