import $ from "jquery"
import Pragma from "./pragma"
import { Compose } from "../composers/templates"
import tippy from "tippy.js"
import Mousetrap from "mousetrap"
import { forArg } from "../composers/helpers"

export default class Comp extends Pragma {
  constructor(map, parent = null){
    super()
    this.actualValue = null

    if (map instanceof Object){
      this.build(map)
      this.parent = parent
    }else{
      this.key = map
    }

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

    // api
    this.append = this.add
    this.do = this.addToChain
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

  addToChain(){
    if (!this.actionChain) this.actionChain = []
    forArg(arguments, (cb => {
      this.actionChain.push(cb)
    }))
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
    if (pv[1]) this.doChain(this.actualValue, this.master, this) // do the chain if the value is in the range
  }

  get value(){
    return this.actualValue
  }
  get master(){
    if (this.parent == null || this.parent.parent == null) return this.parent
    return this.parent.master
  }

  get html(){
    return {
      class: ((v, reset=false) => { 
        if (reset) this.element.removeClass()
        this.element.addClass(v)
        return this 
      }),
      more: "more cool api capabilities coming soon. Usage: pragma.html.class('lucid').......pragmatize()"
    }
  }

  // actions kinda 

  pragmatize(where){
    //this.compose()
    if (where instanceof Pragma) where = where.element
    $(where ? where : document.body).append(this.element)
    this.isAppended = true
    return this
  }

  chain(comp){ 
    this.actionChain = this.actionChain.concat(comp.actionChain) 
    return this
  }

  with(id, key){ return this.contain(Compose(key).as(id)) }

  from(id, skip_id=false){
    id = $(id)
    this.element.remove()
    this.element = null      
    if (!skip_id && id.attr("id")) this.key = id.attr("id")
    this.isAppended = true
    return this.as(id, true)
  }

  as(id, skip_id=false){
    let newElement = $(id)
    if (!skip_id) newElement.attr( "id", this.key )
    if (this.element) this.element.replaceWith(newElement)
    this.element = newElement
    return this
  }

  compose(force=false, tag="div"){
    //if (this.force || !this.element) 
    return this.as($(document.createElement(tag)))
  }

  addSilently(){
    forArg(arguments, (child) => {
      super.add(child)
    })
    return this
  }

  add(){
    forArg(arguments, (child) => {
      // if (this.containsKey(child.key)) {
      // }
      super.add(child)
      if (!child.isAppended) this.element.append(child.element)
    })
    return this
  }

  prepend(){
    forArg(arguments, (child) => {
      // if (this.containsKey(child.key)) {
      // }
      super.add(child)
      if (!child.isAppended) this.element.prepend(child.element)
    })
    return this
  }

  buildInside(map){
    let comp = Compose(map.key+"-composer", null, [map])
    this.buildAndAdd(comp)
    this.host(comp)
  }

  containsKey(key){
    return this.childMap.has(key)
  }

  contain(){
    //this.add(arguments)
    forArg(arguments, (comp) => {
      this.add(comp)
    })
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

  host(){
    const hostCompKey = this.key + "-host"
    let icomp
    forArg(arguments, (comp) => {
    if (this.tippy){
      // if already hosts something
      icomp = this.find(hostCompKey)
      icomp.contain(comp)
      this.tippy.destroy() // destory old tippy instance to create new one
    } else {

      icomp = Compose(hostCompKey).contain(comp)
      this.contain(icomp)
    }

    icomp.element.addClass("pragma-tippy")
    this.setTippy(icomp.element[0])
    })

    return this
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

    if (map.key != null){
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
    Mousetrap.bind(keys, () => { return cb(this) }, event)
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
  setup_listeners(listeners){
    Object.entries(listeners).forEach(([on, cb]) => {
      this.element.on(on, (event) => cb(event, this))
    })
  }

  
}
