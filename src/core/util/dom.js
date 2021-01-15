import { throwSoft, log, suc } from "./log"
import { createEventChains } from "./utilities"

const toHTMLAttr = s => s.replace(/[^a-z0-9]/gi, '-').toLowerCase()

if (!globalThis.pragmaSpace) globalThis.pragmaSpace = {} // initialize Pragma Space # TODO put this somewhere else
createEventChains(globalThis.pragmaSpace, "docLoad")
const whenDOM = globalThis.pragmaSpace.onDocLoad

function _docLoad(){
  if (globalThis.pragmaSpace.isDocLoaded) return

  suc("📰 document is loaded.")
  globalThis.pragmaSpace.docLoadChain.exec()
}
document.addEventListener('readystatechange', () => {
  if (document.readyState === "complete") _docLoad() 
})

document.addEventListener('turbolinks:load', () => {
  suc("🚀 TURBOLINKS loaded")
  _docLoad() 
})

var search = /[#.]/g

// Create a hast element from a simple CSS selector.
function parseQuery(selector, defaultTagName = "div") {
  var value = selector || ''
  var props = {
    tag: defaultTagName
  }
  var start = 0
  let subvalue, previous, match

  while (start < value.length) {
    search.lastIndex = start
    match = search.exec(value)
    subvalue = value.slice(start, match ? match.index : value.length)
    if (subvalue) {
      if (!previous) {
        props.tag = subvalue
      } else if (previous === '#') {
        props.id = subvalue
      } else if (props.class) {
        props.class.push(subvalue)
      } else {
        props.class = [subvalue]
      }
      start += subvalue.length
    }
    if (match) {
      previous = match[0]
      start++
    }
  }
  return props
}

function addClassAryTo(cary, el){
  if (!(Array.isArray(cary))) return throwSoft(`Could not add class [${cary}] to [${el}]`)
  for (let c of cary){
    let _subary = c.split(" ")
    if (_subary.length>1) {
      addClassAryTo(_subary, el)
      continue 
    }
    el.classList.add(c)
  }
}

function selectOrCreateDOM(query){
  let e = document.querySelector(query)
  if (e) return e
  let q = parseQuery(query)

  let el =  document.createElement(q.tag || "div")
  if (q.id) el.id = q.id
  if (q.class) addClassAryTo(q.class, el)

  return el
}

function elementFrom(e){
  if (e instanceof HTMLElement) return e

  if (typeof e === "string"){
    log(e)
    return selectOrCreateDOM(e)
  }

  return throwSoft(`Could not find/create element from [${e}]`)
}

export { 
  whenDOM,
  parseQuery,
  addClassAryTo,
  selectOrCreateDOM,
  elementFrom,
  toHTMLAttr
}

