import PragmaComposer, { valueControls, variants, composer } from '../src'

let colors = [ "tomato", "navy", "lime"]
let fonts = ["Helvetica", "Roboto", "Open Sans", "Space Mono"]

let map = composer(
  "toolbar",
  "icon",
  [
    composer("settings", "settings", [
        variants({
            key: "color",
            value: 1,
            icon: (key, index) => { return `<div style='width:25px;height:25px;border-radius:25px;background:${key}'></div>` },
            set: (comp) => {
              $('.p-6').css({"color": colors[comp.find("color").value]})
            },
            variants: colors
        }), variants({
            key: "font",
            value: 1,
            icon: (key, index) => { return `<div style='width:25px;height:25px;border-radius:25px;font-family:${key}'>Aa</div>` },
            set: (comp) => {
              $('.p-6').css({"font-family": fonts[comp.find("font").value]})
            },
            variants: fonts
        }), valueControls("fovea", 5, 2) 
      ]), valueControls("wpm", 250, 10)]
)

let master = new PragmaComposer(map)
console.log(master.log)

// setInterval( () => {
//   master.find("color").value += 1
//   master.find("font").value += 1
//   master.find("wpm").value += 50
// }, 1500)
// let lec = new Lector($("#article"), settings)
// lec.read()
