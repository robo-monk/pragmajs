import { Compose } from "../../src"
import { wfy } from "./lector_helpers/index"
var __indexOf = [].indexOf || function (e) { for (var t = 0, n = this.length; t < n; t++) { if (t in this && this[t] === e) return t } return -1 }; /* indexOf polyfill ends here*/ jQuery.fn.descendants = function (e) { var t, n, r, i, s, o; t = e === "all" ? [1, 3] : e ? [3] : [1]; i = []; n = function (e) { var r, s, o, u, a, f; u = e.childNodes; f = []; for (s = 0, o = u.length; s < o; s++) { r = u[s]; if (a = r.nodeType, __indexOf.call(t, a) >= 0) { i.push(r) } if (r.childNodes.length) { f.push(n(r)) } else { f.push(void 0) } } return f }; for (s = 0, o = this.length; s < o; s++) { r = this[s]; n(r) } return jQuery(i) }

// function wfy(element){
//   let html = ""
//   element.find("*").each((i, el) => {
//     // console.log(el.text())
//     el = $(el)
//     console.log(el.text())
//     html += el.html()
//   })
//   console.log(html)
//   element.html(html)
//   // element.html(element.text())
// }

const default_options = {
  wfy: true
}

const Word = (element, i) => {
  console.log('composing new word for ' + element.textContent)
  return Compose(i).from(element)
}
const Lector = (l, options=default_options) => {
  l = $(l)
  if (options.wfy) wfy(l)
  $("w").css({"border": ".5px dashed lightgray"})
  $("w").each( (i, el) => {
    Word(el, i)
  })
  return Compose("lector").with("<h1> WASSSSSSUP </h1>")
}

export default function lector(paper){
  
  console.log(paper.text())
  // this
  let lec = Lector(paper.element)
  lec.pragmatize()

  return ["lector"]
}