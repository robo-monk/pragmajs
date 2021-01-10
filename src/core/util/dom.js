import { throwSoft } from "./log"

var turbolinksPresent = false
var docLoaded = false

document.addEventListener('turbolinks:before-visit', () => {
  turbolinksPresent = true
  console.log(":: TURBOLINKS detected")
  document.addEventListener('turbolinks:load', () => {
  })
})

function _docLoaded(){
  return docLoaded || 
    document.readyState === 'complete'
}

function whenDOM(cb) {
  if (_docLoaded()) {
    docLoaded = true
    return cb()
  }

  document.onreadystatechange = () => {
    return whenDOM(cb)
  }
}

var search = /[#.]/g

// Create a hast element from a simple CSS selector.
function parseQuery(selector, defaultTagName = "div") {
  var value = selector || ''
  var props = {}
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
  for (let c of cary){
    el.classList.add(c)
  }
}

function selectOrCreateDOM(query){
  let e = document.querySelector(query)
  if (e) return e
  let q = parseQuery(query)
  let el =  document.createElement(q.tag || "div")
  el.id = q.id
  addClassAryTo(q.class, el)
  return el
}

function elementFrom(e){
  if (e instanceof HTMLElement) return e

  if (typeof e === "string"){
    return selectOrCreateDOM(e)
  }

  return throwSoft(`Could not find/create element from [${e}]`)
}

export { 
  whenDOM,
  parseQuery,
  addClassAryTo,
  selectOrCreateDOM,
  elementFrom
}

