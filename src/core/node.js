// recursively connected with other nodes
import { throwSoft, rk8 } from "./util/index"

export default class Node {
  constructor(key) {
    this.childMap = new Map()
    this.key = typeof key === 'string' ? key : rk8()
    // API
    this.containsKey = this.childMap.has
  }

  get kidsum() { return this.childMap.size }
  get hasKids() { return this.kidsum > 0 }
  get shape() { return this.shapePrefix() }

  get master() {
    if (this.parent == null || this.parent.parent == null) return this.parent
    return this.parent.master
  }

  get children() {
    return Array.from(this.childMap.values())
  }

  get depthKey() {
    if (this.parent) {
      return this.parent.depthKey + "<~<" + this.key
    }
    return this.key
  }

  get allChildren() {
    if (!this.hasKids) return null
    let childs = this.children
    for (let child of childs) {
      let descs = child.allChildren
      if (descs) childs = childs.concat(descs)
    }
    return childs
  }

  find(key) {
    key = key.toString()
    // recursively find a key
    // return false
    // console.log('trying to find', key)
    // console.log(this.childMap)
    if (this.childMap.has(key)) return this.childMap.get(key)
    for (let [k, value] of this.childMap) {
      let vv = value.find(key)
      if (vv) return vv
    }
  }

  adopt(...children){
      for (let child of children){
        this.add(child)
      }
      return this
  }

  add(node) {
    if (!node) return throwSoft(`Could not add [${node}] to [${this.id}]`)
    if (this.childMap.has(node.key)) {
      node.key = `${node.key}_${rk8()}`
      return this.add(node)
    }
    node.parent = this
    this.childMap.set(node.key, node)
    // this.children.push(spragma)
  }

  shapePrefix(prefix = "") {
    let shape = `${prefix}| ${this.type} - ${this.key} \n`
    if (this.hasKids) {
      prefix += "| "
      for (let child of this.children) {
        shape += child.shapePrefix(prefix)
      }
    }
    return shape
  }
}
