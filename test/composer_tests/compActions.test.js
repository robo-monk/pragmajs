import { Variants, Comp, Select, Compose, contain, host } from "../../src"

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
    let colorsComp = Select.color("markercolors", colors, (v, comp, key) => {
      $(document.body).css({"background": colors[comp.find(key).value]}) 
    })

    let settings = Compose("settingsWrapper", "⚙️").contain(colorsComp)
    settings.pragmatize()
    expectShape(settings, ` 
|composer-settingsWrapper||choice-markercolors|||option-markercolors|||option-markercolors|||option-markercolors
      `
    )
  })

  test(".contain recur", () => {
    let element = Compose("kid")  
    let daddy = Compose("daddy")
    let test = daddy.contain(element).contain(element)
    let testfinal = Compose("dad of the daddy").contain(test).contain(test).contain(element)
    expectShape(testfinal, `
    |composer-dadofthedaddy||composer-daddy|||composer-kid|||composer-kid||composer-daddy|||composer-kid|||composer-kid||composer-kid
    `)
  })

  test.skip("test element cannot contain itself", () => {
      
    //expect(daddy.contain(daddy)).toThrow()
  })
})

describe("comp can correctly host another comp", ()=>{
 
  
  test("simple use case", () => {
    let colors = [ "tomato", "navy", "lime"]
    let colorsComp = Select.color("markercolors", colors, (v, comp, key) => {
      $(document.body).css({"background": colors[comp.find(key).value]}) 
    })

    let settings = Compose("settingsWrapper", "⚙️").host(colorsComp)
    settings.pragmatize()

    expectShape(settings, `
    |composer-settingsWrapper||composer-settingsWrapper-host|||choice-markercolors||||option-markercolors||||option-markercolors||||option-markercolors
      `
    )
  })

  test(".host recur", () => {
    let element = Compose("kid")  
    let daddy = Compose("daddy")
    let test = daddy.host(element).host(element)

    let testfinal = Compose("dad of the daddy").host(test.host(element)).host(element)
    
    expectShape(testfinal, `
|composer-dadofthedaddy||composer-dadofthedaddy-host|||composer-daddy||||composer-daddy-host|||||composer-kid|||||composer-kid|||||composer-kid|||composer-kid
    `)
  })

  test.skip("test element cannot contain itself", () => {
      
    //expect(daddy.contain(daddy)).toThrow()
  })
})
