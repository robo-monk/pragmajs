import { Compose, Pragma, Comp } from "../../src"
import { wfy, PragmaWord, PragmaLector } from "./lector_helpers/index"
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
  let w = new PragmaWord({key: i, value: 0}).from(element, true)
  // let nw = new PragmaWord(element, i)
  // w = nw
  let thisw = w.element.find('w')

  if (thisw.length==0) {
    w.listen({
      "click": (e, comp) => {
        // console.log(comp)
        comp.read().then(() => {
          comp.parent.value = comp.key
        })
      },
      "mouseover": (w, comp) => comp.css("background #5e38c74a"),
      "mouseout": (w, comp) => comp.css("background transparent")
    })
  }

  // w.element.css({"border": ".5px dashed lightgray"}) 
  w.css("border .5px dashed lightgray")
  thisw.each( (i, el) => {
    let ww = Word(el, i)
    w.add(ww)
  })
  w.value = 0
  // w.addToChain((v, master, trigger) => {
  //   console.log(v, master, trigger)
  // })
  return w
}


const Lector = (l, options=default_options) => {
  l = $(l)
  if (options.wfy) wfy(l)
  let w = Word(l)
  let lec = new PragmaLector({key:"lector"}).add(w)
  console.table(w)

  lec.mark = "MARK v5"
  lec.value = 0
  // w.value = 0
  lec.addToChain((v, comp, oter) => {
    // comp.element.fadeOut()
    // console.log(v, comp, oter)
    // console.log( w.currentWord.pre.text(), w.currentWord.text(), w.currentWord.next.text())
    // console.log( w.currentWord.text(), w.currentWord.first_in_line)
    // w.currentWord.read()
    // console.log(w.currentWord.mark)
    // console.log(w.currentWord.mark)
  })

  function bindKeys(){
    lec.bind("right", (() => { w.value += 1}))
    lec.bind("left", (() => { w.value -= 1}))
    lec.bind("space", (() => {
      console.log(w.value)
      w.read()
      return false
    }))
    lec.bind("p", (() => {
      console.log(w.value)
      console.log(w.pause())
      // w.currentPromise.reject()
      return false
    }))
  }
  bindKeys()
  // let words = []
  // $("w").each( (i, el) => {
  //   let w = Word(el, i)
  //   // lec.add(w)
  //   // words.push(w)
  //   w.element.css({"border": ".5px dashed lightgray"}) 
  // })
  return lec
}

export default function lector(paper){
  
  console.log(paper.text())
  // this
  let lec = Lector(paper.element)
  lec.pragmatize()

  return ["lector"]
}