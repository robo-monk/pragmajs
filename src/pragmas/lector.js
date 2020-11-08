import $ from "jquery"
import { wfy } from "./helper.js"
import Pragma from "./pragma.js"
import Mark from "./mark.js"
import Word from "./word.js"

export default class Lector extends Pragma{
  constructor(element, options={}){
    super(element)

    this.options = {
      // these are the default values
      toolbar: options.toolbar || false,
      topbar: options.topbar || false,
      loop: options.loop || false,
      autostart: options.autostart || false,
      interactive: options.interactive || true,
      shortcuts: options.shortcuts || true, // if interactive is false, this option doesnt do anything
      freadify: options.freadify == null ? true : options.freadify // will convert plain text to .frd format (scroll to the .frd format section for more)
    }

    if (this.options.freadify){
      this.element.replaceWith(wfy(this.element))
    }
    

    this.reader = new Word(this.element, this, new Mark(this.element))
    // new Pragma(this.target, { mouseover: () => this.target.fadeOut() })
    
  }
  read(){
    this.reader.read()
  }
}
