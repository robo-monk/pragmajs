import $ from "jquery"
import Pragma from "../pragmas/pragma"
export default class PragmaComposer extends Pragma{
  constructor(map){
    super()
    this.element = this.buildSettingsFrom(map)
    $(this.element).appendTo(document.body)
  }

  genSettingBody(map){
    let tag = "div"
    let class_bus = ""
    switch (map.type){
      case "button":
        class_bus += " settings-button"
        break;
      case "value":
        class_bus += "settings-value"
        break;
      case "option":
        class_bus += " settings-option"
        break;
      case "choice":
        class_bus += " settings-choice"
        break;
      default:
        break;
    }
    let element = $(document.createElement(tag))
    element.addClass(class_bus)
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

// export { buildSettingsFrom }