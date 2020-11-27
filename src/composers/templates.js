import Comp from "../pragmas/comp"

// TODO button action refactor
const buttonAction = (key, value, icon, action) => {
  return {
    key: key,
    type: "button",
    icon: icon,
    value: value,
    click: (master, comp) => {
      action(master, comp)
    }
  }
}
const buttonValue = (key, ext, value, step, icon) => {
  return buttonAction(key+ext, value, icon, ((master, comp) => {
    comp.parent.value += step
  }))
}

const Monitor = {
  custom: ((key, val=0, tag, action) => {
    return new Comp({
      key: key,
      value: val,
      set: ((value, master, comp) => { 
        if(action) return action(value, comp, master)
      })
    }).with(`<${tag}>${val}</${tag}>`, key+"-monitor")
  }),
  simple: ((key, val=0, tag="p", action=null) => {
    let actionCb = (value, comp, master) => {
      comp.find(key+"-monitor").element.text(value) 
      if (action) return action(value, comp, master)
    }
    return Monitor.custom(key, val, tag, actionCb) 
  }),
}

const Button = {
  action: ((key, icon, action, tippy) => {
    let btn = new Comp({
      key: key,
      icon: icon,
      type: "button",
      click: action // value comp trigger
    })
    if (tippy) btn.setTippy(tippy)
    return btn
  }),
  controls: ((key, value, step, action, icons) => {

    let plus = Button.action(key+"+", icons["+"] || "+", (master, comp) => {
      comp.parent.value += step
    })

    let minus = Button.action(key+"-", icons["-"] || "-", (master, comp) => {
      comp.parent.value += -step
    })

    return Monitor.simple(key, value, "div").prepend(plus).append(minus)
  })
}



const variantUIActivate = (element) => {
  // console.log(`activating ${element.key} to ${element.value}`)
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
      if (comp && comp.find(attr.key)) variantUIActivate(comp.find(attr.key)) 
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
    })).setRange(0, attrs.length-1).setLoop()
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
  // map string
  // "key type icon"
  let v = string.split(" ")
  return map(v[0], v[1], v[2], elements)
}

const Compose = (key, icon, elements, type="composer") => {
  if (key instanceof Object) return new Comp(key) 
  return new Comp(map(key, type, icon, elements))
}

const Value = (key, value, icon, elements, type="value") => {
  return new Comp(map(key, type, icon, elements))
}

const pragmatize = (comp, where) => {
  comp.pragmatize(where)
  return comp
}

const contain = (a, b) => {
  a.contain(b)
  return a
}

const host = (a, b) => {
 return a.host(b)
}


const Bridge = (stream, keys=[], beam=((object, trigger) => console.table(object))) => {
  //console.log(stream, keys, beam)
  function makeData(master){
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



  let bridgeComp = Compose(stream.key+"Bridge")

  function transmit(trigger){
    beam(bridgeComp.value, trigger)
  }

  bridgeComp.do(((v, master, trigger) => {
    //console.log(v, master, trigger)
    if (keys.includes(trigger.key)) {
      bridgeComp.actualValue = makeData(master)
      transmit(trigger)
    }

  }))

  stream.chain(bridgeComp)

  //stream.addToChain(((v, master, trigger) => {
    ////bridgeComp.value = syncableObj
    ////if (keys.includes(trigger.key)) transmit(syncableObj(master), trigger) 
  //}))

  

  return bridgeComp
}

export { buttonValue, Button, Select, Variants, Compose, Value, pragmatize, contain, host, Bridge, Monitor}

