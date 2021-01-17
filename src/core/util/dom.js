import { throwSoft, log, suc } from "./log"
import { createEventChains } from "./utilities"
import _e from "../element"

const toHTMLAttr = s => s.toString().replace(/[^a-z0-9]/gi, '-').toLowerCase()

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
  try {
    let e = document.querySelector(query)
    if (e) return e
  } catch (e) {}
  
  let q = parseQuery(query)

  let el =  document.createElement(q.tag || "div")
  if (q.id) el.id = q.id
  if (q.class) addClassAryTo(q.class, el)

  return el
}

function fragmentFromString(strHTML) {
    return document.createRange().createContextualFragment(strHTML);
}

function elementFrom(e){
  if (e instanceof Element) return e
  if (typeof e === "string"){
    if (e[0] === "<") return fragmentFromString(e)
    return selectOrCreateDOM(e)
  }

  return throwSoft(`Could not find/create element from [${e}]`)
}

function fillSVG(svg, color){
  console.log(color)
  console.log(_e(svg).findAll("path"))
  _e(svg).findAll("path").forEach(path => {
    const ff = path.attr("fill")
    if (ff!="none" && ff!="transparent"){
      path.attr("fill", color)
    }
  })
}

export {
  whenDOM,
  parseQuery,
  addClassAryTo,
  selectOrCreateDOM,
  elementFrom,
  toHTMLAttr,
  fragmentFromString,
  fillSVG
}
