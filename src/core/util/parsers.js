import { throwSoft } from "./log"

const snake2camel = str => str.replace(/([-_]\w)/g, g => g[1].toUpperCase()) 

const apply = {
  html: ((html, dom) => {
    dom.innerHTML = html 
  }),

  pcss: ((pcss, dom) => {
    for (let [key, value] of parse.cssToDict(pcss)){
      dom.style[snake2camel(key)] = value 
    }
  })
}

const parse = {
  cssToDict: ((str) => {
    str = str.replaceAll("\n", ";").replaceAll(":", " ")
    let cssDict = new Map()
    for (let style of str.split(";")) {
      if (style.replace(/\s/g, "").length < 2) continue
      style = style.trim().split(" ")
      let key = style[0]
      style.shift()
      cssDict.set(key.trim(), style.join(" ").trim())
    }

    // check css properties
    let unsupported = []
    for (const [key, value] of cssDict.entries()) {
      if (!CSS.supports(key, value)) unsupported.push(`${key.trim()}: ${value.trim()}`)
    }

    if (unsupported.length > 0) {
      throwSoft(`CSS syntax error`, 'typos', unsupported)
    }
    return cssDict
  }),

  css: ((pcss) => {
    let css = ""
    for (let [key, value] of parse.cssToDict(pcss)) {
      //console.log(key, value)
      css += `${key}:${value};`
    }
    return css
  }),

  html: ((html) => {
    return html
  })
}

export {
  parse,
  apply
}
