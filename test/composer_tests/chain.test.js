import  { Compose } from "../../src"

describe.skip("can chain with elements correcly", () => {
 // TODO add proper tests
  test("can chain one element", () => {
    let proof = 0
    let fbridge = Compose("freadyBridge")
    fbridge.addToChain(((v, master, comp) => {
      proof = v
    }))

    let menu = Compose("menu").contain(Compose("item"))
    menu.chain(fbridge)
    menu.find("item").value = 420
    expect(proof).toBe(420)
    menu.find("item").value = 69
    expect(proof).toBe(69)
  })

  test("can chain with multiple element and with correct order", () => {
    let proof = 1
    let fbridge = Compose("freadyBridge")
    fbridge.addToChain(((v, master, comp) => {
      proof += v
    }))

    let fbridge2 = Compose("freadyBridge2")
    fbridge2.addToChain(((v, master, comp) => {
      proof *= v
    }))

    let menu = Compose("menu").contain(Compose("item"))
    menu.chain(fbridge).chain(fbridge2)
    menu.find("item").value = 420
    expect(proof).toBe(176820)

    proof = 1
    menu.find("item").value = 69
    expect(proof).toBe(4830)
  })
}) 
