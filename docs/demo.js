import PragmaComposer, { valueControls } from '../src'

let color = 0
let colors = [ "tomato", "navy"]
let font = 0
let fonts = ["Helvetica", "Roboto", "Open Sans", "Space Mono"]
let map = {
  key: "settings",
  type: "composer",
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
              click: () => { 
                color = index;
                $('.p-6').css("color", key)                 
              }
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
        }, valueControls("fovea", 5, 2) 
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

let master = new PragmaComposer(map)

// let lec = new Lector($("#article"), settings)
// lec.read()
