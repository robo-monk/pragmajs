import PragmaComposer, { valueControls, variants } from '../src'

let colors = [ "tomato", "navy", "lime"]
let fonts = ["Helvetica", "Roboto", "Open Sans", "Space Mono"]

let map = {
  key: "settings",
  type: "composer",
  icon: "settings",
  elements: [
    {
      key: "settings",
      type: "composer",
      elements: [
        variants({
            key: "color",
            value: 1,
            icon: (key, index) => { return `<div style='width:25px;height:25px;border-radius:25px;background:${key}'></div>` },
            set: (comp, value) => { 
              console.log(comp) 
            },
            click: (comp) => {
              $('.p-6').css({"color": colors[comp.find("color").value]})
            },
            variants: colors
        }), variants({
            key: "font",
            value: 1,
            icon: (key, index) => { return `<div style='width:25px;height:25px;border-radius:25px;font-family:${key}'>Aa</div>` },
            set: (comp, value) => { console.log(comp) },
            click: (comp) => {
              $('.p-6').css({"font-family": fonts[comp.find("font").value]})
            },
            variants: fonts
        }), valueControls("fovea", 5, 2) 
      ]
    }, valueControls("wpm", 250, 10)]
}

let master = new PragmaComposer(map)

setInterval( () => {
  master.find("color").value += 1
  master.find("font").value += 1
  master.find("wpm").value += 50
  console.log("yeet")
}, 500)
// let lec = new Lector($("#article"), settings)
// lec.read()
