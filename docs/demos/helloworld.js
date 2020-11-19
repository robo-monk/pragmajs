import { Compose } from "../../src"
export default function helloworld(){
  
  let lame = Compose("lame").with("<p>This is a lame demo</p>")
  lame.pragmatize("#helloworld")

  /* execute this by pressing the play button below! */

  return ["lame"]
}

// import { Variants, Comp, ColorSelect, FontSelect, Compose, contain, host } from "../../src"

// export default function doBlock() {

// let colors = [ "tomato", "navy", "lime"]
// let fonts = ["Helvetica", "Roboto", "Open Sans", "Space Mono"]
// let modes = ["background: transparent; border: 1px solid black;"]

// let colorsComp = ColorSelect("markercolors", colors, (v, comp, key) => {
//   $(document.body).css({"background": colors[comp.find(key).value]}) 
// })

// let fontComp = FontSelect("readerfont", fonts, (v, comp, key) => {
//    $(document.body).css({"font-family": fonts[comp.find(key).value]}) 
// })

// let popUpSettings = Compose("popupsettings", "⚙️").host(colorsComp).host(fontComp)
// popUpSettings.pragmatize()

// let settings = Compose("settingsWrapper").contain(popUpSettings)
// settings.pragmatize()


// // compose({} <- pragma maiiiipu)
// // compose(key, icon, elements, type <- pragma map)
// //
// //let colorsComp = new Comp(variants({
//             //key: "color",
//             //value: 1,
//             //icon: (key, index) => { return `<div style='width:25px;height:25px;border-radius:25px;background:${key}'></div>` },
//             //set: (v, comp) => {
//               //$('.p-6').css({"color": colors[comp.find("color").value]})
//             //},
//             //variants: colors
//         //}))



// setInterval(() => {
//   console.log(settings.logs) 
// }, 1000)

// console.log("yyet")
// }
