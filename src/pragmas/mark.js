// mark is responsible for marking words in the screen
import $ from "jquery"
import Pragma from "./pragma"

export default class Mark extends Pragma {
  constructor(parent) {
    super($("<marker></marker>"))
    this.parent = parent
    this.parent.append(this.element)
    // super(element, parent)
    this.isBeingSummoned = false
  }

  summon(dst){
    if (this.isBeingSummoned) return false;
    return new Promise((resolve, reject) => {
      this.isBeingSummoned = true
      setTimeout( () => {
        console.log(`FROM MARK -> marking ${dst.text()}`)
        this.isBeingSummoned = false
        resolve()
      } , 50)
    })
  }

}