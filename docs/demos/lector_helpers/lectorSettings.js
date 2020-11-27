import $ from "jquery"

import { Bridge, Select, Compose, Button, IconBuilder, parse } from "../../../src"
import { mode_ify } from "./conf/modes"

const LectorSettings = (parent) => {

  let colors = ["#a8f19a", "#eddd6e", "#edd1b0", "#96adfc"]
  let fonts = ["Helvetica", "Poppins", "Open Sans", "Space Mono"]
  let modes = ["HotBox", "Underneath", "Faded"]

  let icons = new IconBuilder()
  icons.default.fill = "white"

  function modifyBody(dict) {
    $(document.body).css(dict)
  }

  let colorsComp = Select.color("markercolor", colors).bind("c")
    
  let fontComp = Select.font("readerfont", fonts).bind("f")
                      .html.class("font-selector")

  // TODO
  // font Comp = Select.font.from(fonts).onChange(...).onMouseOver

  // bind rules
  // if type is choices default would be to 
  // plus the value
  //
  // if object has a click action and is called 
  // to bind, do that click action 
  let modeComp = Select.attr("markermode", modes,
    (v, comp, key) => {
      // on value change
      //mode_ify(parent.mark, v, colors[0])
      // console.log(v)
    },
    (key, index) => {
      //console.log(mode_ify(null, modes[index], "transparent"))
      console.log(parse.css(mode_ify(null, modes[index], "transparent")))
      // icon contruction
      return {
        type: "pointerModeOption",
        html: `<div class='pointer-color' style='display: block; width:35px; height:15px; ${parse.css(mode_ify(null, modes[index], "transparent") + "; mix-blend-mode normal")}'></div>`
      }
    }).bind("m", null, "keyup")


  // key, initial val, step
  let wpmSet = (value, comp ) => { 
    /* on set */ 
    //console.log(value,comp)
  }

  let wpmComp = Button.controls("wpm", 250, 10, wpmSet, {
    "+": icons.grab("plus"),
    "-": icons.grab("minus")
  }).setRange(10, 300)
    .html.class("inline-grid grid-cols-3 gap-x-1 items-center")

  //wpmComp.children.forEach(child => child.html.class("items-center"))
  //wpmComp.find("wpm+").bind(["=", "+"]).html.class("flex content-center")
  //wpmComp.find("wpm-").bind("-").html.class("flex content-center")

  //let linkComp = Button.action("commiter", "C",
    //() => {
      //alert("lazy")
    //}).pragmatize().bind("o")

  let popUpSettings = Compose("popupsettings", "⚙️")
    .host(colorsComp, fontComp, modeComp)

  popUpSettings.illustrate(icons.grab("settings")) // icons

  let settings = Compose("settingsWrapper").contain(popUpSettings, wpmComp).html.class("items-center")
  settings.pragmatize()

  let syncedKeys = ["markercolor", "readerfont", "markermode", "wpm"]
  let freadyBridge = Bridge(settings, syncedKeys,
    (object, trigger) => {
      // on set of any watched attribute
      let color = colors[object.markercolor]
      let mode = modes[object.markermode]
      let font = fonts[object.readerfont]
      // modify pointer
      let modeCss = mode_ify(parent.mark, mode, color)
      console.log(modeComp)

      modeComp.children.forEach((child) => {
        if (color) child.css(`background ${color}`)
        //console.log(parse.css(modeCss))
      })

      $("w").css({ "font-family": font })
      
      // sync data
      console.log(object)
    })

  freadyBridge.set({
    wpm: 280,
    readerfont: 1,
    markercolor:1,
    markermode: 1
  })

  return settings




  // let colors = ["tomato", "navy", "lime"]
  // let fonts = ["Helvetica", "Roboto", "Open Sans", "Space Mono"]
  // let modes = ["HotBox", "Underneath", "Faded"]

  // let colorsComp = Select.color("markercolors", colors, (v, comp, key) => {
  //   parent.mark.element.css({ "background": colors[comp.find(key).value] })
  // })

  // let fontComp = Select.font("readerfont", fonts, (v, comp, key) => {
  //   $("w").css({ "font-family": fonts[comp.find(key).value] })
  // })

  // let modeComp = Select.attr("markermode", modes, (v, comp, key) => {
  //   // on set
  //   console.log(v)
  // }, (key, index) => {
  //   // icon
  //   return { type: "pointerModeOption", html: "M" }
  // })

  // let popUpSettings = Compose("popupsettings", "⚙️").contain(colorsComp, fontComp, modeComp)

  // let settings = Compose("settingsWrapper").contain(popUpSettings)

  // let syncedKeys = ["markercolors", "readerfont", "markermode"]
  // let freadyBridge = Bridge(settings, syncedKeys, (object) => {
  //   // TODO add beam
  // })

  // settings.chain(freadyBridge) // every time a value is changed, do the freadyBridge's actions as well

  // return settings
}

export { LectorSettings }
