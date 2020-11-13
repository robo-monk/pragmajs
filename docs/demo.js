//import Pragma, { valueControls, variants, composer, container } from '../src'
//import Pragma, { valueControls, variants, composer, container } from '../src'
import { Variants, Comp, ColorSelect, Compose, contain, host } from "../src"

let colors = [ "tomato", "navy", "lime"]
let fonts = ["Helvetica", "Roboto", "Open Sans", "Space Mono"]

let colorsComp = ColorSelect("markercolors", colors, (v, comp, key) => {
  $(document.body).css({"background": colors[comp.find(key).value]}) 
})

let fontComp = Variants("readerfont", fonts, (v, comp, key) => {
   $(document.body).css({"font-style": fonts[comp.find(key).value]}) 
})

// compose({} <- pragma map)
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



let settings = Compose("settingsWrapper", "⚙️").host(colorsComp.host(fontComp))
settings.pragmatize()

setInterval(() => {
  console.log(settings.logs) 
}, 1000)


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
