import { Comp } from "../../../src";
import PinkyPromise from "./pinkyPromise"

export default class PragmaWord extends Comp {

  get index(){
    return this.key
  }
  get mark(){
    if (this.parent) return this.parent.mark
    return null 
  }
  set mark(m){
    if (this.parent) this.parent.mark = m
    return null
  }
  get currentWord(){
    if (!this.hasKids) return this
    return this.find(this.value).currentWord
  }
  
  sibling(n){
    return this.parent ? this.parent.find(this.index + n) : null
  }
  // get next() {
  //   if (!this.hasKids)  return this.parent.next
  //   if (this.kidsum-this.value-1>0) return this.sibling(1).currentWord
  //   return null
  // }
  get next() {
    return this.sibling(1)
  }
  get pre() {
    return this.sibling(-1)
  }
  same_line(n) {
    return this.sibling(n) != null && ((this.sibling(n).top() - this.top()) ** 2 < 10)
  }
  get first_in_line() {
    return !this.same_line(-1)
  }
  get last_in_line() {
    return !this.same_line(1)
  }
  time(wpm = 250) {
    return 7
    // return charsMsAt(wpm) * wordValue(this, generateDifficultyIndex(this))
  }
  pause(){
    this.currentPromise.catch((e)=>{
      console.warn(e)
      this.currentPromise = null
    })

    this.currentPromise.cancel("pause")
    return this
  }

  set currentPromise(p){
    if (this.parent) return this.parent.currentPromise = p
    this.currentPromiseVal = new PinkyPromise((resolve, reject) => {
      p.catch((e) => {
        console.warn(e)
        // this.currentPromiseVal = null
        // reject(e)
      }).then(() => {
        // this.currentPromiseVal = null
        resolve()
        this.currentPromiseVal = null
      })
    })
  }

  get currentPromise() {
    return this.parent ? this.parent.currentPromise : this.currentPromiseVal
  }

  promiseRead(){
    this.currentPromise = new PinkyPromise((resolve, reject) => {
        setTimeout(() => {
          // this.mark = "MARK V5 " + this.text() + this.key
          // console.log(this.mark)
          // console.log(this.text())
          console.log(this.text())
          this.parent.value += 1
          resolve(` read [ ${this.text()} ] `)
        }, 1000)
      })
    // console.log(this.mark)
    return this.currentPromise
  }

  read(){
    // console.log('reading ' + this.text())
    // if (this.hasKids) console.log(this.currentWord)
    if (this.currentPromise) return new Promise((resolve, reject) => { resolve('already reading') })
    if (this.hasKids) return this.currentWord.read()
    this.promiseRead()
    // console.log(this)
    return new PinkyPromise(resolve => {
      this.currentPromise.then(() => {
       resolve()
       this.currentPromise = null
       return this.parent.read()
      }).catch(e => resolve('pause'))
    })
  }
}