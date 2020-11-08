import Pragma from "./pragma.js"
import { crush } from "./helper.js"

export default class Word extends Pragma{
  constructor(element, parent, mark=null, index=0){
    super(element)
    this.parent = parent
    this.mark = mark || this.parent.mark
    this.cursor = 0
    this.index = index
    this.addKids()
  }
  time(){
    return crush(this.text().length)
  }

  addKids(){
    let index=0
    this.element.find("w").each((x, el)=>{
      if (el.textContent.length > 0){
        this.add(new Word(el, this, this.mark, index))
        index+=1
      }
    })
  } 

  summon(){
    console.log('im being fucken summoned')
  }

  read(){
    if (this.children.length - this.cursor > 0){
      this.children[this.cursor].read().then( () =>{
        this.cursor += 1
        this.read()
      })
    }else{
      return this.mark.guide(this)
    }
  }
  sibling(n){
    return this.parent ? this.parent.children[this.index+n] : null
  }
  next(){
    return this.sibling(1)
  }
  pre(){
    return this.sibling(-1)
  }
  same_line(n){
    return this.sibling(n) && ((this.sibling(n).top() - this.top())**2 < 10 )
  }
  first_in_line(){
    return !this.same_line(-1)
  }
  last_in_line(){
    return !this.same_line(1)
  }
}