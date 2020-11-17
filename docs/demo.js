//import Pragma, { valueControls, variants, composer, container } from '../src'
//import Pragma, { valueControls, variants, composer, container } from '../src'
// TODO do code blocks like this, and print them to an element
// import doBlock from "./demos/helloworld"

// doBlock()
// console.log(doBlock.toString())

import { Bridge, Select, Compose, Button, Comp, IconBuilder } from "../src"
require("../src/third_party/idle")

let colors = [ "tomato", "navy", "lime"]
let fonts = ["Helvetica", "Roboto", "Open Sans", "Space Mono"]
let modes = ["HotBox", "Underneath", "Faded"]

let icons = new IconBuilder()
icons.default.fill = "white"

let colorsComp = Select.color("markercolors", colors, (v, comp, key) => {
  $(document.body).css({"background": colors[comp.find(key).value]}) 
})

let fontComp = Select.font("readerfont", fonts, (v, comp, key) => {
   $(document.body).css({"font-family": fonts[comp.find(key).value]}) 
})

let modeComp = Select.attr("markermode", modes, (v, comp, key) => {
  // on set
  console.log(v)
}, (key, index) => {
  // icon
  return { type: "pointerModeOption", html: "M" }
})

let wpmComp = Button.controls("wpm", 250, 10, (value, comp) => {
}, { "+": icons.grab("plus"), "-": icons.grab("minus")})

let linkComp = Button.action("commiter", "C", () => {
  alert("lazy")
}).pragmatize()

// TODO host array
let popUpSettings = Compose("popupsettings", "⚙️").host(colorsComp).host(fontComp).host(modeComp)
// let popUpSettings = Compose("popupsettings", "⚙️").contain(colorsComp).contain(fontComp).contain(modeComp)
// popUpSettings.pragmatize()

// icons

popUpSettings.illustrate(icons.grab("settings"))


let settings = Compose("settingsWrapper").contain(popUpSettings).contain(wpmComp)
settings.pragmatize()

let paper = new Comp({
  key: "paper",
  element: $("#paper")
})

let syncedKeys = ["markercolors", "readerfont", "markermode", "wpm"]
let freadyBridge = Bridge(settings, syncedKeys, (object, trigger) => {
  paper.element.append(`<li>${trigger.key} -> ${trigger.value}</li>`)
}) 

settings.chain(freadyBridge) // every time a value is changed, do the freadyBridge's actions as well

console.log(icons.settings)

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

console.time(".find()")
console.log(settings.find("markermode"))
console.timeEnd(".find()")

console.log(colorsComp.depthKey)
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
