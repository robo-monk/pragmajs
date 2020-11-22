import { Comp } from "../../../src";

export default class PragmaLector extends Comp {

  get mark(){
    return this.markPragma
  }
  set mark(m){
    this.markPragma = m
  }
  get currentWord(){
    return this.find(this.value)
  }

  // read(){
  //   // super.read()
  //   // if (this.hasKids) console.log(this.currentWord)
  //   // this.mark = "MARK V5 " + this.element.text()
  //   // console.log(this.mark)
  // }
}