import { Variants, Comp, ColorSelect, Compose, contain } from "../../src"
describe("Pragma Composer stress test", () =>{
  test("stress test", () => {
    let time = new Date().getTime()
    let colors = [
      "red", "orange", "blue", "brown", "violet", "green",
      "yellow", "rose", "dk", "shit", "i", "ran", "out", "of",
      "shit", "to", "write"
    ]

    let fonts = ["Helvetica", "Roboto", "Open Sans", "Space Mono"]

    let colorsComp = Compose("colors").contain(ColorSelect("markercolors", colors, (v, comp, key) => {
      $(document.body).css({"background": colors[comp.find(key).value]}) 
    }))

    let fontComp = Variants("readerfont", fonts, (v, comp, key) => {
       
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

    colorsComp.contain(fontComp).contain(fontComp).contain(fontComp)
    let settings = Compose("settingsWrapper", "⚙️").contain(colorsComp).contain(fontComp).contain(colorsComp)
    settings.pragmatize()

    let performancems = new Date().getTime() - time
    console.log(performancems)
    expect(performancems).toBeLessThan(100) // generate this in under 100 milliseconds
  })
})
