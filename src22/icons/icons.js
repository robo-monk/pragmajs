import $ from "jquery"
import { throwSoft } from "../composers/helpers"

// TODO put these helper functions somewhere else
function fill(svg, color){
  svg.find("path").each((i, path)=>{
    path = $(path)
    const ff = path.attr("fill")
    if (ff!="none" && ff!="transparent"){
      path.attr("fill", color)
    }
  })
}

function getObjDiff(og, n){
  if (!(typeof og == typeof n === "object")) return n
  for (const [key, val] of Object.entries(n)){
    og[key] = val
  }
  return og
}

function grabOrThrow(icon, from){
  if (!from) return throwSoft(`Icon Database is not defined, while trying to grab [${icon}] from [${from}].`, "fixes", ["Typo in the file name?", "Did you forget to initialize IconBuilder with an icon database?"])
  const i = from[icon]
  if (!i) return throwSoft(`Could not find ${icon}`)
  return $(i)
}

export default class IconBuilder {
  constructor(database, defaults=null){
    this.db = database
    this.default = defaults || {
      fill: "black",
      width: "18px",
      height: "18px",
      viewBox: "0 0 24 24"
    }
  }
  set default(n){
    this.defaultOptions = getObjDiff(this.default, n)
  }

  get default(){
    return this.defaultOptions
  }

  optionify(options){
    if (typeof options === 'object') return getObjDiff(this.default, options)
    return this.default
  }

  grab(icon, options){
    options = this.optionify(options) 
    let i = grabOrThrow(icon, this.db)

    for (const [attr, val] of Object.entries(options)){
      if (attr == "fill") fill(i, val)
      i.attr(attr, val)
    }

    return i
  }

  build(icon, options){
    if ((options && options.skip) || dontEnvelope.includes(icon)) return this.db[icon]
    return this.buildIcon(this.db[icon], options)
  }

  buildIcon(icon, options={}){
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="${options.viewBox || this.default.viewBox }" fill="${options.fill || this.default.fill}" 
      width="${options.width || this.default.width}" height="${options.height || this.default.height}" ${options.extra}>
        ${icon}
      </svg>
      `
  }
}