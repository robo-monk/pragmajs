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

  build(map){
    this.element = $(document.createElement("div"))
    this.element.html("🐳")
    $(document.body).append(this.element)

    if (map.elements){
      for (let element of map.elements){
        let child = new PragmaComposer(element, this)
        this.add(child) 
      }
    }

    this.value = map.value

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

    if (map.set){
      this.onset = map.set
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

  genSettingBody(map){
    let tag = "div"
    let element = $(document.createElement(tag))
    element.addClass("pragma-composer-" + map.type)
    element.attr("id", map.key)
    return element
  }

  buildSettingsFrom(map){
    let element = this.genSettingBody(map)
    // element += `<div class='${map.key}'>${map.key}`
    if (map.elements && map.elements.length > 0){
      map.elements.forEach((el_map) => {
        this.buildSettingsFrom(el_map).appendTo(element)
      })
    }

    if (map.choices){
      map.choices.forEach((choice, index) => {
        // console.log(choice)
        let templ = map.element_template(choice, index)
        templ.type = "option"
        this.buildSettingsFrom(templ).appendTo(element)
      })
    }

    if (map.click){
      element.on("click", map.click)
    }

    if (map.icon){
      let icon = $(document.createElement("div"))
      icon.html(map.icon)
      element.append(icon)
    }
    // console.log(element)
    return element
  }
}

