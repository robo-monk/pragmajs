import Pragma from "./pragma.js"

export default class Word extends Pragma{
  constructor(element, parent, mark=null){
    super(element)
    this.mark = mark || this.parent.mark
    this.cursor = 0
    this.addKids()
  }
  addKids(){
    this.element.find("w").each((index, el)=>{
      this.add(new Word(el, this, this.mark))
    })
  } 
  summon(){
    console.log('im being fucken summoned')
  }
  read(){
    if (this.children.length - this.cursor > 0){
      // this.children[this.cursor].read().then(() => this.read())
      this.children[this.cursor].read().then( () =>{
        this.cursor += 1
        this.read()
      })
      
    }else{
      return this.mark.summon(this.element)
    }
  }
}