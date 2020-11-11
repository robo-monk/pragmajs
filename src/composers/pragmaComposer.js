import $ from "jquery"
import Pragma from "../pragmas/pragma"
import { composer } from "./templates"
import tippy from "tippy.js"

export default class PragmaComposer extends Pragma {
  constructor(map, parent = null){
    super()
    this.actualValue = null
    this.parent = parent
    this.build(map)
  }

  get log(){


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

  add(child){
    super.add(child)
    this.element.append(child.element)
  }

  buildInside(map){
    let comp = composer(map.key+"-composer", null, [map])
    this.buildAndAdd(comp)
    this.tippy = tippy(this.element[0], {
      content: comp.element[0],
      allowHTML: true,
      interactive: true
    })
  }

  buildAndAdd(element){
      let child = new PragmaComposer(element, this)
      this.add(child)
  }
  
  buildArray(ary){
    for (let element of ary){
      this.buildAndAdd(element)
    }
  }

  build(map){
    this.element = $(document.createElement("div"))
    $(document.body).append(this.element)

    if (map.icon){
      this.icon = $(document.createElement("div"))
      this.icon.html(map.icon)
      this.icon.appendTo(this.element)
    }

    if (map.elements) this.buildArray(map.elements)
    if (map.hover_element) this.buildInside(map.hover_element)
    if (map.value) this.value = map.value
    if (map.set) this.onset = map.set

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
        console.log(variant)
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

