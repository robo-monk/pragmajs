const buttonValue = (key, value, step, icon) => {
  return {
    key: key + "_button",
    type: "button",
    icon: icon,
    value: value,
    click: (comp) => {
      let key_element = comp.find(key)
      key_element.value += step
    }
  }
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

export { buttonValue, valueControls}