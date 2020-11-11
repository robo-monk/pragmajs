const buttonAction = (key, value, icon, action) => {
  return {
    key: key + "_button_" + value,
    type: "button",
    icon: icon,
    value: value,
    click: (comp) => {
      action(comp)
    }
  }
}
const buttonValue = (key, value, step, icon) => {
  return buttonAction(key, value, icon, (comp) => {
    let key_element = comp.find(key)
    key_element.value += step
  })
}

// TODO add icons
const valueControls =  (key, value, step) => {
  return {
    key: key,
    type: "value",
    value: value,
    set: (value, comp)=>{
      let key_monitor = comp.find(`${key}-monitor`)  
      key_monitor.element.html(value)
    },
    elements: [
      buttonValue(key, value, -step, "-"),
      {
        key: `${key}-monitor`,
        type: "monitor",
      },
      buttonValue(key, value, step, "+"),
    ]
  }
}

const variantUIActivate = (element) => {
  console.log(`activating ${element.key} to ${element.value}`)
  for (let variant of element.children){
    variant.element.removeClass("pragma-active")
  }
  element.children[element.value].element.addClass("pragma-active")
}

const variantUIAction = (comp, index, attr) => {
  let element = comp.find(attr.key)
  element.value = index
}

const variants = (attr) =>{
  // attr = {
  //   key: key,
  //   value: value,
  //   icon: icon_html,
  //   set: set_cb,
  //   click: click_cb,
  //   variants: variants
  // }
  return {
    key: attr.key,
    value: attr.value,
    type: "choice",
    element_template: (key, index) => {
      return buttonAction(attr.key, index, attr.icon(key, index), (comp) => {
        console.log("logged")
        variantUIAction(comp, index, attr)
      })
    },
    set: (value, comp) => {
      console.log(`setting ${attr.key} to ${value}`)
      variantUIActivate(comp.find(attr.key)) 
      attr.set(comp)
    },
    variants: attr.variants
  }
}

const composer = (key, icon, elements) => {
  return {
    key: key,
    type: "composer",
    icon: icon,
    elements: elements
  }
}

export { buttonValue, valueControls, variants, composer }
