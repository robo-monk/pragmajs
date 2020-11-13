import { Variants, Comp, ColorSelect, Compose, contain } from "../../src"

function clean(str){
  str = str.replace(/\s/g, "");
  return str
}

function expectShape(comp, exp_shape){
  return expect(clean(comp.shape)).toBe(clean(exp_shape)) 
}

describe("comp can correctly contain another comp", ()=>{
 
  
  test("simple use case", () => {
    let colors = [ "tomato", "navy", "lime"]
    let colorsComp = ColorSelect("markercolors", colors, (v, comp, key) => {
      $(document.body).css({"background": colors[comp.find(key).value]}) 
    })

    let settings = Compose("settingsWrapper", "⚙️").contain(colorsComp)
    settings.pragmatize()
    expectShape(settings, `
    | composer - settingsWrapper
    | | choice - markercolors
    | | | option - markercolors_button_0
    | | | option - markercolors_button_1
    | | | option - markercolors_button_2
      `
    )
  })

  test("recur", () => {
    let element = Compose("kid")  
    let daddy = Compose("daddy")
    let test = daddy.contain(element).contain(element)
    let testfinal = Compose("dad of the daddy").contain(test).contain(test).contain(element)
    expectShape(testfinal, `| composer - dad of the daddy
    | | composer - daddy
    | | | composer - kid
    | | | composer - kid
    | | composer - daddy
    | | | composer - kid
    | | | composer - kid
    | | composer - kid`)
  })

  test.skip("test element cannot contain itself", () => {
      
    //expect(daddy.contain(daddy)).toThrow()
  })
})
