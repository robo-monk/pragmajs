//import Pragma, { valueControls, variants, composer, container } from '../src'
//import Pragma, { valueControls, variants, composer, container } from '../src'
// TODO do code blocks like this, and print them to an element
// import doBlock from "./demos/helloworld"

// TODO have an api that can support building literally any page through one var,
// let comp = Compose().build(Compose()........ / dont use it like that but concept wise it should
// be doable and actually really efficient


//hwblock.pragmatize()
// doBlock()
// console.log(doBlock.toString())

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)


import { Bridge, Select, Compose, Button, Comp, IconBuilder, Pragma } from "../src"

import helloworld from "./demos/helloworld"
import bigdemo from "./demos/bigdemo"
import todo from "./demos/todo"

// const beautify = require('js-beautify');
var beautify = require('js-beautify')

let icons = new IconBuilder()
icons.default.fill = "black"
let paper = new Comp({
    key: "paper",
    element: $("#paper")
  })

function strBlock(block) {
  let lines = block.toString().split("\n")
  let untab_lines = []
  lines = lines.splice(1, lines.length-3) // remove function text and the return }
  lines.forEach((line, i) => {
    untab_lines[i] = line.replace("  ", "") 
  })

  return beautify(untab_lines.join("\n").replaceAll("_src.", "")
             .replaceAll(";", "")
             .replaceAll("(0, Compose)", "Compose")
    .replaceAll("(0, Bridge)", "Bridge"), {
      end_with_newline: true, 
      indent_size: 2,
      space_in_empty_paren: true,
      break_chained_methods: false
    })
}
let cleanIds = []
function doBlock(block, nextblock) {
  cleanIds.forEach( (id) => {
    $(`#${id}`).remove()
  })
  cleanIds = block(paper)
  if (nextblock) {
    paper.contain(nextblock)
    hljs.highlightBlock(nextblock.element.find("pre")[0])
    // setTimeout(() => { console.log(paper.element.find("pre")[1]); hljs.highlightBlock(paper.element[0]) }, 500)
    console.log("next block")
  }
}


const Block = ((key, block, nextblock) => { 
  let preElement = $(document.createElement("pre"))
  let codeElement = $(document.createElement("code"))
  codeElement.text(strBlock(block))
  codeElement.addClass("lang-js")
  preElement.html(codeElement)
  

  let doblock = Button.action("doblock", icons.grab("play"), (m, comp) => { 
    doBlock(block, nextblock) 
    comp.icon.fadeTo(80, .5)
  }, "Do Block")

  let copyblock = Button.action("copyblock", icons.grab("copy"), (m, comp) => {
    navigator.clipboard.writeText(strBlock(block))
    comp.icon.fadeTo(80, .2)
    comp.setTippy("Copied!")
    comp.tippy.show()
  }, "Copy")

  return new Comp({
      key: key,
      icon: key+".js",
      type: "demo-block",
      elements: [
        {
          key: "code",
          type: "code",
          element: preElement
        }
      ]
    }).contain(doblock, copyblock)
  })

//rainbow.color()

let bgblock = Block("bigdemo", bigdemo)
let todoblock= Block("tododemo", todo, bgblock)
let hwblock = Block("helloworld", helloworld, todoblock)
paper.contain(hwblock)

console.log(new Pragma)
// console.time()
// console.timeEnd()

// let idle = false
// function fadeAway(){
//   if (idle) {
//     settings.element.fadeTo(100, .5)
//     setTimeout(() => {
//       if (idle) settings.element.fadeOut()
//     }, 1500)
//   }
// }
// $(document).idle({
//   onIdle: (() => {
//     idle = true
//     fadeAway()
//   }),
//   onActive: (() => {
//     idle = false
//     settings.element.fadeTo(1, 50)
//   }),
//   idle: 5000
// })

// fader.chain(settings)
// settings.chain(fader)
// compose({} <- pragma maiiiipu)
// compose(key, icon, elements, type <- pragma map)
//
//let colorsComp = new Comp(variants({
            //key: "color",
            //value: 1,
            //icon: (key, index) => { return `<div style='width:25px;height:25px;border-radius:25px;background:${key}'></div>` },
            //set: (v, comp) => {
              //$('.p-6').css({"color": colors[comp.find("color").value]})
            //},
            //variants: colors
        //}))



// setInterval(() => {
//   console.log(settings.logs) 
// }, 1000)

// console.time(".find()")
// console.log(settings.find("markermode"))
// console.timeEnd(".find()")

// console.log(colorsComp.depthKey)

//
//let settings = composer("settingsWrapper", "⚙️", [])
//let master = container(settings, composer(
  //"toolbar",
  //"⚙️",
  //[
    //composer("settings", "", [
        //variants({
            //key: "color",
            //value: 1,
            //icon: (key, index) => { return `<div style='width:25px;height:25px;border-radius:25px;background:${key}'></div>` },
            //set: (comp) => {
              //$('.p-6').css({"color": colors[comp.find("color").value]})
            //},
            //variants: colors
        //}), 
        //variants({
            //key: "font",
            //value: 1,
            //icon: (key, index) => { return `<div style='width:25px;height:25px;border-radius:25px;font-family:${key}'>Aa</div>` },
            //set: (comp) => {
              //$('.p-6').css({"font-family": fonts[comp.find("font").value]})
            //},
            //variants: fonts
        //}), 
        //valueControls("fovea", 5, 2) 
      //]), 
    //valueControls("font-size", 18, 2, (value, comp)=>{
      //$('.p-6').css({"font-size": value})
      //console.log(value)
    //})
  //]
//))


// let master = new PragmaComposer(map)
  // let t = tippy(`#${settings.key}`, {
  //   content: master.element[0],
  //   allowHTML: true,
  //   interactive: true
  // })

// setInterval( () => {
//   master.find("color").value += 1
//   master.find("font").value += 1
//   master.find("wpm").value += 50
// }, 1500)
// let lec = new Lector($("#article"), settings)
// lec.read()

hljs.initHighlightingOnLoad()