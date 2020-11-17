import { db } from "./icondb"

const dontEnvelope = [ "help" ]

export default class IconBuilder {
  constructor(defaults=null){
    this.default = defaults || {
      fill: "black"
    }
  }
  grab(icon, options){
    if (dontEnvelope.includes(icon)) return db[icon]
    return this.buildIcon(db[icon], options)
  }

  buildIcon(icon, options={}){
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${options.fill || this.default.fill || "black"}" width="18px" height="18px">
        ${icon}
      </svg>
      `
  }
}