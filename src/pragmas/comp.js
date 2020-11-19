import $ from "jquery"
import Pragma from "./pragma"
import { Compose } from "../composers/templates"
import tippy from "tippy.js"
import Mousetrap from "mousetrap"

export default class Comp extends Pragma {
  constructor(map, parent = null){
    super()
    this.keys = []
    this.actualValue = null
    this.parent = parent
    this.build(map)
    this.log_txt = ""

    // this.unchain()
    // TODO add init chain or smth like thatjj
    this.addToChain((
    (v, master, trigger=this) => { 
      if (this.master) {
        master.doChain(v, master, trigger) // let master know something changed
        master.log(`${trigger.key} -> ${v}`)
      }
    }))
  }

  log(n){
    this.log_txt = this.log_txt.concat(" | " + n)
    // console.log(this.log_txt)
  }

  doChain(v, master, trigger=this){
    if (!this.actionChain) return null
    for (let cb of this.actionChain){
      cb(v, master, trigger)
    }
  }

  unchain(){
    this.actionChain = []
    this.addToChain((
    (v, master, trigger=this) => { 
      if (this.master) {
        master.doChain(v, master, trigger) // let master know something changed
        master.log(`${trigger.key} -> ${v}`)
      }
    }))

    return this
  }

  do(cb){ return this.addToChain(cb) }
  addToChain(cb){
    if (!this.actionChain) this.actionChain = []
    this.actionChain.push(cb)
    return this
  }

    
  get logs(){
    return this.log_txt
  }
  
  proc_value(v){
    // returns the bounded value and a bool to do the chain or not
    if (this.loopingValue) return [this.loopBoundVal(v), true]
    let r = this.rangeBoundVal(v)
    return [r, r==v]
  }
  set value(v){
    let pv = this.proc_value(v)
    this.actualValue = pv[0]
    if (pv[1]) this.doChain(this.actualValue, this.master) // do the chain if the value is in the range
  }

  get value(){
    return this.actualValue
  }
  get master(){
    if (this.parent == null || this.parent.parent == null) return this.parent
    return this.parent.master
  }

  // TODO this algo sucks
  // convert to binary search after shorting kids in a smart way

  find(key){
    // recursively find a key
    if (this.key == key) return this
    if (this.hasKids){
      for (let child of this.children){
        let potential_child = child.find(key)
        if (potential_child) return potential_child
      }

    }
  }

  // actions kinda 

  pragmatize(where){
    //this.compose()
    if (where instanceof Pragma) where = where.element
    $(where ? where : document.body).append(this.element)
    return this
  }

  chain(comp){ 
    this.actionChain = this.actionChain.concat(comp.actionChain) 
    return this
  }

  with(id, key){
    let new_element = new Comp({
      key: key || key+this.children.length.toString(),
      element: $(id)
    })
    
    this.add(new_element)
    return this
  }

  as(id){
    let newElement = $(id)
    newElement.attr( "id", this.key )
    if (this.element) this.element.replaceWith(newElement)
    this.element = newElement
    return this
  }
  compose(force=false, tag="div"){
    //if (this.force || !this.element) 
    return this.as($(document.createElement(tag)))
  }

  add(child){
    if (this.containsKey(child.key)) {
      // console.warn(`> pragmajs \n, Could not add child \n - ${this.key} already has ${child.key} as
      // a child. `)
    }
    super.add(child)
    this.keys.push(child.key)
    this.element.append(child.element)
  }

  buildInside(map){
    let comp = Compose(map.key+"-composer", null, [map])
    this.buildAndAdd(comp)
    this.host(comp)
  }

  containsKey(key){
    return this.find(key) ? true : false
  }

  contain(comp){
    this.add(comp)
    comp.parent = this
    return this
  }

  setTippy(comp, options){
    if (!options) options = { 
      allowHTML: options,
      interactive: true,
      theme: "pragma",
      arrow: false
    }
    let contentOption = {
      content: comp
    }
    this.tippy = tippy(this.element[0], {...contentOption, ...options} )
    return this
  }

  host(comp){
    const hostCompKey = this.key + "-host"
    let icomp
    if (this.tippy){
      // if already hosts something
      icomp = this.find(hostCompKey)
      icomp.contain(comp)
      this.tippy.destroy() // destory old tippy instance to create new one
    }else{
      icomp = Compose(hostCompKey).contain(comp)
      this.contain(icomp)
    }

    icomp.element.addClass("pragma-tippy")
    return this.setTippy(icomp.element[0])
  }

  buildAndAdd(element){
      let child = new Comp(element, this)
      this.add(child)
  }
  
  buildArray(ary){
    for (let element of ary){
      this.buildAndAdd(element)
    }
  }

  illustrate(icon){
    if (!this.icon) {       
      this.icon = $(document.createElement("div"))
      this.icon.addClass("pragma-icon")
      this.icon.appendTo(this.element)
    }
    this.icon.html(icon)
    return this
  }

  build(map){
    //this.pragmatize()
    this.compose(true)

    if (map.icon) this.illustrate(map.icon)
      

    if (map.elements) this.buildArray(map.elements)
    if (map.hover_element) this.buildInside(map.hover_element)
    if (map.value) this.value = map.value
    if (map.set) this.addToChain((v, master, comp) => map.set(v, master, comp))
    // if (map.set) this.onset = (v, comp) => { 

    //   this.master.log(`${map.key} -> ${v}`); 
    //   map.set(v, comp) 
    // }

    if (map.key){
      this.key = map.key
      this.element.attr("id", this.key)
    }

    if (map.type){
      this.type = map.type
      this.element.addClass(`pragma-${map.type}`)
    }

    if (map.click){
      this.onclick = () => { 
          map.click(this.master, this) 
      }
      this.element.addClass(`pragma-clickable`)
      this.setup_listeners({
        "click": this.onclick
      })
    }
    if (map.mouseover){
      this.element.addClass("pragma-hoverable")
      this.setup_listeners({
        "onmouseover": () => {
          map.mouseover(this.master)
        }
      })
    }
    if (map.mouseout){
      this.setup_listeners({
        "mouseout": () => {
           map.mouseover(this.master)
        }
      })
    }

    if (map.element) this.element = $(map.element)
    if (map.element_template && map.variants){
      map.variants.forEach((variant, index) => {
        let templ = map.element_template(variant, index)
        templ.type = "option"
        this.buildAndAdd(templ)
      })
    }
  }

  dismantle(){
    this.children = []
    return this
  }
  leaveUsKidsAlone(){
    return this.dismantle()
  }

  // mousetrap integration
  proc_bind_cb(cb){
    if (!cb){
      if (this.onclick) return (()=> { this.onclick(this.master) })
      return ((comp) => { comp.value += 1 })
    }
    return cb
  }
  bind(keys, cb, event){
    cb = this.proc_bind_cb(cb)
    Mousetrap.bind(keys, () => { cb(this) }, event)
    return this
  }

  get allChildren(){
    if (!this.hasKids) return null
    let childs = this.children
    for (let child of childs){
      let descs = child.allChildren
      if (descs) childs = childs.concat(descs)
    }
    return childs
  }

  get depthKey(){
    if (this.parent) {
      return this.parent.depthKey+"<~<"+this.key
    }
    return this.key
  }

  shapePrefix(prefix=""){
    let shape = `${prefix}| ${this.type} - ${this.key} \n`
    if (this.hasKids) {
        prefix += "| "
      for (let child of this.children){
        shape += child.shapePrefix(prefix)
      }
    }
    return shape
  }

  setRange(min, max){
    this.rangeAry = [min, max]
    return this 
  }

  loopBoundVal(v){
    if (!this.loopingValue) return v

    let l = this.loopingValue
    v = v > l[1] ? l[0] :  v
    v = v < l[0] ? l[1] :  v
    return v
  }
  setLoop(min, max){
    let actualMin = min || (this.range ? this.range[0] : 0)
    let actualMax = max || (this.range ? this.range[1] : 69)
    this.loopingValue = [actualMin, actualMax]
    return this
  }

  rangeBoundVal(v){
    if (!this.range) return v
    return Math.max(this.range[0], Math.min(v, this.range[1]))
  }

  get range(){
    return this.rangeAry
  }

  get shape(){
    return this.shapePrefix()
  }

  descOf(comp){
    return comp.find(this.key) ? true : false 
  }
}
