// a pragma is defined as a concept, which has an actual physical object "connected"
// with it
import $, { expr } from "jquery"

class Pragma {
  constructor(element=null, listeners={}, key){
    this.element = $(element)
    this.generate_key(key)
    // this.children = []
    this.childMap = new Map()
    this.setup_listeners(listeners)
  }
  get children() {
    return Array.from(this.childMap.values())
  }
  generate_key(key){
    if (key != null) {
      this.key = key
    }else{
      this.key = btoa(Math.random()).substr(10, 5) 
    }
  }

  find(key){
    // recursively find a key
    // return false
    if (this.childMap.has(key)) return this.childMap.get(key)
    for (let [k, value] of this.childMap) {
      let vv = value.find(key) 
      if (vv) return vv
    }
  }
  add(spragma){
    if (this.childMap.has(spragma.key)) { 
      spragma.key = spragma.key + "~"
      return this.add(spragma)
    }
    spragma.parent = this
    this.childMap.set(spragma.key, spragma)
    // this.children.push(spragma)
  }
  get kidsum() { return this.childMap.size }
  get hasKids() { return this.kidsum > 0 }

  listen(listeners){
    this.setup_listeners(listeners)
    return this
  }
  setup_listeners(listeners){
    Object.entries(listeners).forEach(([on, cb]) => {
      this.element.on(on, () => cb())
    })
  }
  click(){}

  text(){
    return this.element.text()
  }
  offset(){
    return this.element.offset()
  }
  left(){
    return this.offset().left
  }
  top(){
    return this.offset().top
  }
  height(){
    return this.element.height()
  }
  width(){
    return this.element.width()
  }
  x(relative_width){
    return this.left() + this.width()/2 - relative_width/2
  }

  css(str){
    // background red, text-align center,
    // text-align center, 
    str = str.replaceAll("\n", ";").replaceAll(":", " ")
    let cssDict = new Map()
    for(let style of str.split(";")){
      if (style.replace(/\s/g, "").length<2) continue
      style = style.trim().split(" ") 
      let key = style[0]
      style.shift()
      cssDict.set(key, style.join(" "))
    }

    // check css properties
    let unsupported = []
    for (const [key, value] of cssDict.entries()){
      if (!CSS.supports(key, value)) unsupported.push(`${key.trim()}: ${value.trim()}`)
    }

    try {
      if (unsupported.length > 0) throw "css syntax"
      this.element.css(Object.fromEntries(cssDict))
    } catch (error) {
      console.error(`%c 🧯 pragma.js  %c \n
      encountered a soft error 🔫 %c \n
      \nSoft error while trying to parse and apply CSS to Pragma [${this.key}] %c\n
      \n${ error=="css syntax" ? `Potential typos: \n\t${unsupported.join("\n\t")}` : '' }
      `, "font-size:15px", "font-size: 12px;", "color:whitesmoke", "color:white")
      
    }
    return this
  }
}

export { Pragma as default }