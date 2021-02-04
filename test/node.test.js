import { Pragma } from "../dist/pragma.esm"

describe("Node can add nodes", () => {
  test("Simple .add", () => {
    let a = new Pragma()
    let b = new Pragma()
    let c = new Pragma()
    b.add(a)
    b.add(c)

    expect(b.children.length).toBe(2)
  })

  test("Adopt", () => {
    let a = new Pragma()
    let b = new Pragma()
    let c = new Pragma()
    let d = new Pragma()
    let e = new Pragma()
    a.adopt(b,c,d,e)

    expect(a.children.length).toBe(4)
  })

  test("Adopt elements with same key", () => {
    let a = new Pragma()
    let b = new Pragma('key')
    let c = new Pragma('key')
    let d = new Pragma('key')
    let e = new Pragma('key')

    a.adopt(b,c,d,e)
    // console.log(a.childMap.keys())

    expect(a.children.length).toBe(4)
    expect(a.find(b.key)).toBe(b)
  })
})
