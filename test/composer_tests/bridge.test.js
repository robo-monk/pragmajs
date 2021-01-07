import { Bridge, Compose, Value, contain, chain } from "../../src"
let valueComp
let masterComp
let t
let bridge

describe.skip("Bridge works", () => {

  beforeEach(() => {
    valueComp = Value("value", 1)  
    masterComp = Compose("master").contain(valueComp)
  
    t = 0
    bridge = Bridge(masterComp, ["value"], (object, trigger) => {
      //console.log(comp, trigger)
      //console.log(object["value"])
      t += object["value"] 
    })
    //masterComp.chain(bridge)
  })

  test("bridges each time a value changes in bridged object", () => {
    valueComp.value = 420
    expect(t).toBe(420)

    valueComp.value = 69
    expect(t).toBe(420+69)

    let r = Math.random()**2
    valueComp.value = r
    expect(t).toBe(420+69+r)
  })

  test(".unchain() works", () => {
    masterComp.unchain() 
    valueComp.value = 420
    expect(t).not.toBe(420)
  })

  test("bridges for multiple keys", () => {

    masterComp = Compose("master")
    let valueComp2 = Value("value2", 2) 

    bridge = Bridge(masterComp, ["value", "value2"], (object, trigger) => {
      t += trigger.value
    })

    masterComp.contain(valueComp, valueComp2)

    valueComp2.value = 420
    valueComp.value = 420
    expect(t).toBe(840)
    
  })
  test("only bridges for included keys", () => {

    masterComp = Compose("master")
    let valueComp2 = Value("value2", 2) 
    let valueComp3 = Value("value3", 2) 

    bridge = Bridge(masterComp, ["value", "value2"], (object, trigger) => {
      t += trigger.value
    })

    masterComp.contain(valueComp, valueComp2)

    valueComp2.value = 420
    valueComp.value = 420
    expect(t).toBe(840)

    valueComp3.value = 420
    expect(t).toBe(840)
  })
})
