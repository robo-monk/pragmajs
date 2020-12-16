export function forArg(args, cb){
  for (let i=0; i<args.length; i+=1){
    cb(args[i])
  }
}

export const throwSoft = (desc, potential=null, fixes=['rerun the code 10 times'], trigger=null) => {
  console.error(`%c 🧯 pragma.js  %c \n
      encountered a soft error 🔫 %c \n
      \n${trigger ? `Triggered by: [${trigger.key} ${trigger}]` :``}
      \n${desc} %c\n
      \n${ potential!=null ? `Potential ${potential}: \n\t${fixes.join("\n\t")}` : '' }
      `, "font-size:15px", "font-size: 12px;", "color:whitesmoke", "color:white")
  // throw "pragmajs: " + desc
}

export const parse = {
  cssToDict:((str) => {
    // console.log(`parsing pcss`)
    //console.log(str)

    str = str.replaceAll("\n", ";").replaceAll(":", " ")
    let cssDict = new Map()
    for(let style of str.split(";")){
      if (style.replace(/\s/g, "").length<2) continue
      style = style.trim().split(" ") 
      let key = style[0]
      style.shift()
      cssDict.set(key.trim(), style.join(" ").trim())
    }

    // check css properties
    let unsupported = []
    for (const [key, value] of cssDict.entries()){
      if (!CSS.supports(key, value)) unsupported.push(`${key.trim()}: ${value.trim()}`)
    }
    
    if (unsupported.length > 0){
      throwSoft(`CSS syntax error`, 'typos', unsupported)
    }
    return cssDict
  }),
  css: ((pcss) => {
    let css = ""
    for (let [key, value] of parse.cssToDict(pcss)) {
      //console.log(key, value)
      css+=`${key}:${value};`
    }
    return css
  })
}
