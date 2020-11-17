import { Bridge, Select, Compose, Button, Comp, IconBuilder } from "../../src"
require("../../src/third_party/idle")
export default function bigdemo(paper){

  let colors = ["tomato", "navy", "lime"]
  let fonts = ["Helvetica", "Roboto", "Open Sans", "Space Mono"]
  let modes = ["HotBox", "Underneath", "Faded"]

  let icons = new IconBuilder()
  icons.default.fill = "white"

  let colorsComp = Select.color("markercolors", colors, (v, comp, key) => {
    $(document.body).css({ "background": colors[comp.find(key).value] })
  }).bind("c")

  let fontComp = Select.font("readerfont", fonts, (v, comp, key) => {
    $(document.body).css({ "font-family": fonts[comp.find(key).value] })
  }).bind("f")
  // could be equivelant to ?
  // font Comp = Select.font.from(fonts).onChange(...).onMouseOver

  // bind rules
  // if type is choices default would be to plus the value
  //
  // if object has a click action and is called to bind, do that click action 
  let modeComp = Select.attr("markermode", modes, (v, comp, key) => {
    // on set
    console.log(v)
  }, (key, index) => {
    // icon
    return { type: "pointerModeOption", html: "M" }
  }).bind("m", null, "keyup")

  // could be equivelant to ?
  // let modeComp = Select.attr.

  let wpmComp = Button.controls("wpm", 250, 10, (value, comp) => {
  }, { "+": icons.grab("plus"), "-": icons.grab("minus") }).setRange(10, 300)
  wpmComp.find("wpm+").bind(["=", "+"])
  wpmComp.find("wpm-").bind("-")

  let linkComp = Button.action("commiter", "C", () => {
    alert("lazy")
  }).pragmatize().bind("A")

  // TODO host array
  let popUpSettings = Compose("popupsettings", "⚙️").host(colorsComp).host(fontComp).host(modeComp)
  // let popUpSettings = Compose("popupsettings", "⚙️").contain(colorsComp).contain(fontComp).contain(modeComp)
  // popUpSettings.pragmatize()

  // icons

  popUpSettings.illustrate(icons.grab("settings"))


  let settings = Compose("settingsWrapper").contain(popUpSettings).contain(wpmComp)
  settings.pragmatize()

  

  let syncedKeys = ["markercolors", "readerfont", "markermode", "wpm"]
  let freadyBridge = Bridge(settings, syncedKeys, (object, trigger) => {
    paper.element.append(`<li>${trigger.key} -> ${trigger.value}</li>`)
  })

  settings.chain(freadyBridge) // every time a value is changed, do the freadyBridge's actions as well


}