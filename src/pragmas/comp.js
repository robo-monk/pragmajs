import $ from "jquery"
import Pragma from "./pragma"
import { Compose } from "../composers/templates"
import tippy from "tippy.js"

export default class Comp extends Pragma {
  constructor(map, parent = null){
    super()
    this.actualValue = null
    this.parent = parent
    this.build(map)
    this.log_txt = ""
  }

  log(n){
    this.log_txt = this.log_txt.concat(" | " + n)
  }

  get logs(){
    return this.log_txt
  }

  set value(v){
    this.actualValue = v 
    if (this.onset){
      this.onset(v, this.master)
    }
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

  compose(force=false){
    //if (this.force || !this.element) 
    this.element = $(document.createElement("div"))
    return this
  }

  pragmatize(){
    //this.compose()
    $(document.body).append(this.element)
    return this
  }

  contain(comp){
    this.add(comp)
    comp.parent = this
    return this
  }

  add(child){
    super.add(child)
    this.element.append(child.element)
  }

  buildInside(map){
    let comp = Compose(map.key+"-composer", null, [map])
    this.buildAndAdd(comp)
    this.host(comp)
  }

  host(comp){
    let icomp = Compose(comp.key+"-composer").contain(comp)
    this.contain(icomp)
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
    if (map.set) this.onset = (v, comp) => { this.master.log(`${map.key} -> ${v}`); map.set(v, comp) }

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
}

