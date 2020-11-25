import $ from "jquery"

import { Bridge, Select, Compose, Button, IconBuilder } from "../../../src"
import { mode_ify } from "./conf/modes"

const LectorSettings = (parent) => {

  let colors = ["#a8f19a", "#eddd6e", "#edd1b0", "#96adfc"]
  let fonts = ["Helvetica", "Roboto", "Open Sans", "Space Mono"]
  let modes = ["HotBox", "Underneath", "Faded"]

  let icons = new IconBuilder()
  icons.default.fill = "white"

  function modifyBody(dict) {
    $(document.body).css(dict)
  }

  let colorsComp = Select.color("markercolors", colors,
    (v, comp, key) => {
      // parent.mark.css(`background ${v}`)
      mode_ify(parent.mark, modes[0], v)
    }).bind("c")

  let fontComp = Select.font("readerfont", fonts,
    (v, comp, key) => {
      $("w").css({ "font-family": v })
    }).bind("f")

  // could be equivelant to ?
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
      mode_ify(parent.mark, v, colors[0])
      // console.log(v)
    },
    (key, index) => {
      // icon contruction
      return {
        type: "pointerModeOption",
        html: "M"
      }
    }).bind("m", null, "keyup")


  // key, initial val, step
  let wpmSet = (value, comp ) => { /* on set */ }
  let wpmComp = Button.controls("wpm", 250, 10, wpmSet, {
    "+": icons.grab("plus"),
    "-": icons.grab("minus")
  }).setRange(10, 300)

  wpmComp.find("wpm+").bind(["=", "+"])
  wpmComp.find("wpm-").bind("-")

  let linkComp = Button.action("commiter", "C",
    () => {
      alert("lazy")
    }).pragmatize().bind("o")

  let popUpSettings = Compose("popupsettings", "⚙️")
    .host(colorsComp, fontComp, modeComp)
  // TODO host & contain array

  popUpSettings.illustrate(icons.grab("settings")) // icons


  let settings = Compose("settingsWrapper").contain(popUpSettings, wpmComp)
  settings.pragmatize()

  let syncedKeys = ["markercolors", "readerfont", "markermode", "wpm"]
  let freadyBridge = Bridge(settings, syncedKeys,
    (object, trigger) => {
      paper.element.append(`<li>${trigger.key} -> ${trigger.value}</li>`)
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