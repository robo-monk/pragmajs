import { throwSoft, log } from "./log"

const toHTMLAttr = s => s.replace(/[^a-z0-9]/gi, '-').toLowerCase()

function whenDOM(cb) {
  // TODO holy shit improve this code im throwing up
  if (document.readyState === 'complete') {
    return cb()
  }
  document.addEventListener('turbolinks:load', () => {
    log(":: TURBOLINKS loaded")
    return cb()
  })
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
  if (!cary || !(cary.constructor === "Array")) return throwSoft(`Could not add class [${cary}] to [${el}]`)
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
  elementFrom,
  toHTMLAttr
}

