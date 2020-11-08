import $ from "jquery"
import { wfy } from "./helper.js"
import Pragma from "./pragma"

export default class Lector {
  constructor(target, options={}){
    this.target = $(target)

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
      this.target.replaceWith(wfy(this.target))
    }

    // new Pragma(this.target, { mouseover: () => this.target.fadeOut() })
    
  }
}
