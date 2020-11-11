import $ from "jquery"
import Pragma from "../pragmas/pragma"

export default class PragmaComposer extends Pragma {
  constructor(map, parent = null){
    super()
    this.actualValue = null
    this.parent = parent
    this.build(map)
  }
  set value(v){
    // console.log(v)
    if (this.onset){
      this.onset(v, this.master)
    }
    this.actualValue = v 
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
    if (this.children == null) return 0
    let childs = this.children.length
    for (let child of this.children){
      childs += child.allChildren
    }
    return childs
  }
}

