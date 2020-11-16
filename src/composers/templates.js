import Comp from "../pragmas/comp"

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

const Select = {
  attr: ((key, attrs, onset, icon, value=0) => {
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
  }),
  color: ((key, colors, onset, value=0) => {
    return Select.attr(key, colors, onset, (key, index) => { return { css: `background:${key}`, html: "" } }, value) 
  }),
  font: ((key, fonts, onset, value=0) => {
    return Select.attr(key, fonts, onset, (key, index) => { return { css: `font-family:${key}`, html: "Aa" } }, value) 
  })
}

// base
const map = (key, type, icon, elements=null, value=null) => {
  return {key:key,type:type,value:value,icon:icon,elements:elements}
}
const maps = (string, elements=null) => {
  // "key type icon"
  let v = string.split(" ")
  return map(v[0], v[1], v[2], elements)
}

const Compose = (key, icon, elements, type="composer") => {
  return new Comp(map(key, type, icon, elements))
}

const Value = (key, value, icon, elements, type="value") => {
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


const Bridge = (stream, keys=[], beam=((object) => console.table(object))) => {
  function syncableObj(master){
    let sync = {}
    for (let key of keys){
      let c = master.find(key)
      if (c){
        sync[key] = c.value
      }else{
        console.warn(`pragmajs > could not find ${key} in ${master.key}
        when bridgin through ${bridgeComp.key}`)
      }
      
    }
    return sync
  }

  function transmit(object){
    beam(object)
  }

  let bridgeComp = Compose(stream.key+"Bridge")
  bridgeComp.addToChain(((v, master, trigger) => {
    if (keys.includes(trigger.key)) transmit(syncableObj(master)) 
  }))

  return bridgeComp
}

// function userPrefs(master){
//   return {
//     color: master.find("markercolors").value,
//     font: master.find("readerfont").value,
//     mode: master.find("markermode").value
//   }
// }
// function transmitToFready(master){
//   console.table(userPrefs(master))
// }
// let fbridge = Compose("freadyBridge")
// fbridge.addToChain(((v, master, comp) => {
//   if (comp.descOf(popUpSettings)) transmitToFready(master) 
// }))

// settings.chain(fbridge)



export { buttonValue, valueControls, Select, Variants, Compose, Value, pragmatize, contain, host, Bridge }

