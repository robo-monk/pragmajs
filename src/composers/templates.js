import Comp from "../pragmas/comp"
import tippy from "tippy.js"

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
const valueControls = (key, value, step, action=(()=>{})) => {
  return {
    key: key,
    type: "value",
    value: value,
    set: (value, comp)=>{
      let key_monitor = comp.find(`${key}-monitor`)  
      key_monitor.element.html(value)
      console.log(value)
      action(value, comp)
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

const Variants = (key, value, icon, set, click, variants) => {
  return new Comp(map_variants({key:key,value:value,icon:icon,set:set,click:click,variants:variants}))
}

const map_variants = (attr) =>{
  // key, value, icon, set_cb, clickcb, variants
  return {
    key: attr.key,
    value: attr.value,
    type: "choice",
    element_template: (key, index) => {
      return buttonAction(attr.key, index, attr.icon(key, index), (comp) => {
        variantUIAction(comp, index, attr)
      })
    },
    set: (value, comp) => {
      variantUIActivate(comp.find(attr.key)) 
      attr.set(value, comp, attr.key)
    },
    variants: attr.variants
  }
}

const text = (text, key=null, elements=[]) => {
  if (key==null) key = text
  return {
    key: key,
    type: "text",
    icon: text,
    elements: elements
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

const container = (a, b) => {
  a = new Comp(a)
  b = new Comp(b)
  let t = tippy(a.element[0], {
    content: b.element[0],
    allowHTML: false,
    interactive: true
  })
  return a
}

const buildInside = (a, b) => {
  a = new Comp(a)
  b = new Comp(b)
  let t = tippy(a.element[0], {
    content: b.element[0],
    allowHTML: false,
    interactive: true
  })
  return a
}

const AttrSelect = (key, attrs, onset, icon, value=0) => {
  return new Comp(map_variants({
      key: key,
      value: value,
      icon: (key, index) => {
        let attr = icon(key, index)
        return `<div class="${attr.type}" style='width:25px;height:25px;border-radius:25px;${attr.css}'>${attr.html}</div>`
      },
      set: (v, comp, key) => {
        onset(attrs[v], comp, key)
      },
      variants: attrs
  }))
}

const ColorSelect = (key, colors, onset, value=0) => {
  return AttrSelect(key, colors, onset, (key, index) => { return { css: `background:${key}`, html: "" } }, value) 
}

const FontSelect = (key, fonts, onset, value=0) => {
  return AttrSelect(key, fonts, onset, (key, index) => { return { css: `font-family:${key}`, html: "Aa" } }, value) 
}


// base
const map = (key, type, icon, elements=null) => {
  return {key:key,type:type,icon:icon,elements:elements}
}
const maps = (string, elements=null) => {
  // "key type icon"
  let v = string.split(" ")
  return map(v[0], v[1], v[2], elements)
}

const Compose = (key, icon, elements, type="composer") => {
  return new Comp(map(key, type, icon, elements))
}

const pragmatize = (comp) => {
  comp.pragmatize()
  return comp
}

const contain = (a, b) => {
  a.contain(b)
  return a
}

const host = (a, b) => {
 return a.host(b)
}

const hideable = (a, delay) => {

}


export { buttonValue, valueControls, Variants, Compose, pragmatize, contain, ColorSelect, FontSelect, host, AttrSelect }

