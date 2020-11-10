import PragmaComposer from '../src'
import Pragma from "../src"
let color = 0
let colors = [ "tomato", "navy"]
let font = 0
let fonts = ["Helvetica", "Roboto", "Open Sans", "Space Mono"]
let map = {
  key: "settings",
  elements: [
    {
      key: "settings",
      type: "button",
      icon: "settings",
      elements: [
        {
          key: "color",
          value: 1,
          type: "choice",
          element_template: (key, index) => {
            return {
              key: key,
              value: index,
              icon: `<div style='width:25px;height:25px;border-radius:25px;background:${key}'></div>`,
              click: () => { color = index }
            }
          },
          choices: colors
        }, {
          key: "font",
          value: 1,
          type: "choice",
          element_template: (key, index) => {
            return {
              key: key,
              value: index,
              icon: `<div style='width:25px;height:25px;border-radius:25px;font-family:${key}'>Aa</div>`,
              click: () => { font = key }
            }
          },
          choices: fonts
        }, {
          key: "fovea",
          value: 5,
          elements: [
            {
              key: "fovea -",
              type: "button",
              icon: "-",
              click: () => { console.log(key) }
            },
            {
              key: "fovea-monitor"
            },
            {
              key: "fovea +",
              icon: "+",
              click: () => { console.log("+") }
            }
          ],
          type: "value",
          min: 3,
          max: 15,
          step: 1
        }
      ]
    },
    {
      key: "wpm",
      value: 250,
      type: "value_verbose",
      min: 10,
      max: 4000,
      step: 10
    }]
}
console.table(new PragmaComposer(map))
// let lec = new Lector($("#article"), settings)
// lec.read()