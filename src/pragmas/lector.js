import $ from "jquery"
import { wfy } from "./helper.js"
import Pragma from "./pragma.js"
import Mark from "./mark.js"
import Word from "./word.js"
import Mousetrap from "mousetrap"
import Settings from "./settings"

export default class Lector extends Pragma{
  constructor(element, options={}){
    super(element)
    this.setup_options(options)
   
    this.reading = false
    this.reader = new Word(this.element, this, new Mark(this))
    // this.reader.children[7].read()
    this.read()
    // new Pragma(this.target, { mouseover: () => this.target.fadeOut() })

    let other = { 
        key: "settings",
        elements: [
        {
          key: "settings",
          type: "button",
          icon: "settings",
          elements: [
            {
              key: "color",
              value: 1,
              type: "choice",
              element_template: (key, index) => {
                return {
                  key: key,
                  value: index,
                  icon: `<div style='width:25px;height:25px;border-radius:25px;background:${key}'></div>`,
                  click: () => { this.mark.color = index }
                }
              },
              choices: this.mark.colors
            },{
              key: "font",
              value: 1,
              type: "choice",
              element_template: (key, index) => {
                return {
                  key: key,
                  value: index,
                  icon: `<div style='width:25px;height:25px;border-radius:25px;font-family:${key}'>Aa</div>`,
                  click: () => { this.font = key }
                }
              },
              choices: this.fonts
            }, {
              key: "fovea",
              value: 5,
              elements: [
                {
                  key: "fovea -",
                  type: "button",
                  icon: "-",
                  click: () => { this.mark.fovea -= 1 }
                },
                {
                  key: "fovea-monitor"
                },
                {
                  key: "fovea +",
                  icon: "+",
                  click: () => { this.mark.fovea += 1 }
                }
              ],
              type: "value",
              min: 3,
              max: 15,
              step: 1
            }
          ]
        },
        {
          key: "wpm",
          value: 250,
          type: "value_verbose",
          min: 10,
          max: 4000,
          step: 10
        }]
       }
    this.settings = new Settings(this, other)
    
    this.reader.mark.settings.add({wpm: 250})
    Mousetrap.bind(["a", 'space'], () => {
      if (!this.reading){
        this.read()
      }else{
        this.pause()
      }
      // return false to prevent default browser behavior
      // and stop event from bubbling
      return false;
    });
  }
  get mark(){
    return this.reader.mark
  }
  get fonts(){
    return ["Open Sans", "Arial", "Helvetica", "Space Mono"]
  }
  set font(font){
    this.reader.element.css({"font-family": font})
  }
  read(){
    this.reading = true
    this.reader.read()
  }
  pause(){
    this.reading = false
    this.reader.pause()
  }

  setup_options(options){
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
  }
}
