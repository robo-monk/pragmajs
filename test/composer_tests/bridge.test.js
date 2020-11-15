import { Bridge, Compose, Value, contain, chain } from "../../src"
let valueComp
let masterComp
let t
let bridge

describe("Bridge works", () => {

  beforeEach(() => {
    valueComp = Value("value", 1)  
    masterComp = Compose("master").contain(valueComp)
  
    t = 0
    bridge = Bridge(masterComp, ["value"], (comp) => {
      t += comp.value  
    })
    masterComp.chain(bridge)
  })

  test("bridges each time a value changes in bridged object", () => {
    valueComp.value = 420
    expect(t).toBe(420)

    valueComp.value = 69
    expect(t).toBe(420+69)
  })

  test(".unchain() works", () => {
    masterComp.unchain() 
    valueComp.value = 420
    expect(t).not.toBe(420)
  })

  test("bridges only for keys that are included", () => {

    masterComp = Compose("master")
    let valueComp2 = Value("value2", 2) 

    bridge = Bridge(masterComp, ["value", "value2"], (comp) => {
      t += comp.value
    })

    masterComp.contain(valueComp).contain(valueComp2)
    masterComp.chain(bridge)

    valueComp2.value = 420
    expect(t).not.toBe(420)
    expect(t).toBe(0)
    
  })

})
