import $ from "jquery"
import Pragma from "./pragma"
import { Compose } from "../composers/templates"
import tippy from "tippy.js"

export default class Comp extends Pragma {
  constructor(map, parent = null){
    super()
    this.keys = []
    this.actualValue = null
    this.parent = parent
    this.build(map)
    this.log_txt = ""

    this.addToChain((
    (v, master, comp=this) => { 
      if (this.master) {
        master.doChain(v, master, comp) // let master know something changed
        master.log(`${comp.key} -> ${v}`)
      }
    }))
  }

  log(n){
    this.log_txt = this.log_txt.concat(" | " + n)
    console.log(this.log_txt)
  }

  doChain(v, master, comp){
    if (!this.actionChain) return null
    for (let cb of this.actionChain){
      cb(v, master, comp)
    }
  }

  addToChain(cb){
    if (!this.actionChain) this.actionChain = []
    this.actionChain.push(cb)
  }

    
  get logs(){
    return this.log_txt
  }

  set value(v){
    this.actualValue = v 
    this.doChain(v, this.master) 
    // console.log('did the chain')
  }
  get value(){
    return this.actualValue
  }
  get master(){
    if (this.parent == null || this.parent.parent == null) return this.parent
    return this.parent.master
  }

  find(key){
    // recursively find a key
    if (this.key == key) return this
    if (this.hasKids){
      for (let child of this.children){
        let potential_child = child.find(key)
        if (potential_child) return potential_child
      }

    }
  }

  // actions kinda 

  pragmatize(){
    //this.compose()
    $(document.body).append(this.element)
    return this
  }

  chain(comp){ 
    this.actionChain = this.actionChain.concat(comp.actionChain) 
    return this
  }
  compose(force=false){
    //if (this.force || !this.element) 
    this.element = $(document.createElement("div"))
    return this
  }

  add(child){
    super.add(child)
    this.keys.push(child.key)
    this.element.append(child.element)
  }

  buildInside(map){
    let comp = Compose(map.key+"-composer", null, [map])
    this.buildAndAdd(comp)
    this.host(comp)
  }

  contain(comp){
    this.add(comp)
    comp.parent = this
    return this
  }

  host(comp){
    const hostCompKey = this.key + "-host"
    let icomp

    if (this.tippy){
      // if already hosts something
      icomp = this.find(hostCompKey)
      icomp.contain(comp)
    }else{
      icomp = Compose(hostCompKey).contain(comp)
      this.contain(icomp)
    }

    this.tippy = tippy(this.element[0], {
      content: icomp.element[0],
      allowHTML: true,
      interactive: true
    })
    return this
  }

  buildAndAdd(element){
      let child = new Comp(element, this)
      this.add(child)
  }
  
  buildArray(ary){
    for (let element of ary){
      this.buildAndAdd(element)
    }
  }

  build(map){
    //this.pragmatize()
    this.compose(true)

    if (map.icon){
      this.icon = $(document.createElement("div"))
      this.icon.html(map.icon)
      this.icon.appendTo(this.element)
    }

    if (map.elements) this.buildArray(map.elements)
    if (map.hover_element) this.buildInside(map.hover_element)
    if (map.value) this.value = map.value
    if (map.set) this.addToChain((v, comp) => map.set(v, comp))
    // if (map.set) this.onset = (v, comp) => { 

    //   this.master.log(`${map.key} -> ${v}`); 
    //   map.set(v, comp) 
    // }

    if (map.key){
      this.key = map.key
      this.element.attr("id", this.key)
    }

    if (map.type){
      this.type = map.type
      this.element.addClass(`pragma-${map.type}`)
    }

    if (map.click){
      this.setup_listeners({
        "click": () => { 
          map.click(this.master) 
        }
      })
    }

    if (map.element_template && map.variants){
      map.variants.forEach((variant, index) => {
        let templ = map.element_template(variant, index)
        templ.type = "option"
        this.buildAndAdd(templ)
      })
    }
  }

  get allChildren(){
    if (!this.hasKids) return null
    let childs = this.children
    for (let child of childs){
      let descs = child.allChildren
      if (descs) childs = childs.concat(descs)
    }
    return childs
  }

  get depthKey(){
    if (this.parent) {
      return this.parent.depthKey+"<~<"+this.key
    }
    return this.key
  }

  shapePrefix(prefix=""){
    let shape = `${prefix}| ${this.type} - ${this.key} \n`
    if (this.hasKids) {
        prefix += "| "
      for (let child of this.children){
        shape += child.shapePrefix(prefix)
      }
    }
    return shape
  }

  get shape(){
    return this.shapePrefix()
  }

  descOf(comp){
    return comp.find(this.key) ? true : false 
  }
}
