import $ from "jquery"
import { wfy } from "./helper.js"

export default class Lector {
  constructor(target){
    this.target = $(target)
    this.target.replaceWith(wfy(this.target))
  }
  
  turnRed(){
    this.target.css({"background":"red"})
  }
}
