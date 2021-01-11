import { Pragma } from "../dist/pragma.esm"

describe("Pragma can be generated with Map", () => {
  let p = new Pragma({
    id: 'jeff',
    value: 0,
    children: [
      { id: "jeff's child", value: 420 },
      { id: "jeff's second child", value: 422 }
    ]
  })

  test("Can generate a Pragma with a map", () => {
    expect(p.value).toBe(0) 
    expect(p.id).toBe("jeff") 
  })
})


describe("Pragma's action chain works", () => {
  let p = new Pragma({
    id: "n",
    value: 0
  })

  test("Pragma's action gets triggered when value is changed", () => {

    let haha = 0
    p.do(function() {
      haha = this.value
    })

    p.value = 69
    expect(haha).toBe(69)
  })

  test("Manually execute Pragma's action with extra params", () => {
    let b = ""
    p.do((arg) => {b = arg })
    p.exec("piri") 
    expect(b).toBe("piri")
  })

  test("All actions are getting called", () => {

    let a, b, c

    p.do((self, value) => {
      a = 1 
    }).do((self, value) => {
      b = 1
    }).do((self, value) => {
      c = 1 
    }).do(function() {
      this.nice = 42069
    })

    p.value = "yeehaw"

    expect(a).toBe(1)
    expect(b).toBe(1)
    expect(c).toBe(1)
    expect(p.nice).toBe(42069)
  })

})


describe("Pragmas can contain other pragmas", () => {
  test("Simple .contain", () => {
    var a, b, c, d, e
    a = new Pragma() 
    b = new Pragma() 
    b.contain(a)
    // console.log(b)
  })
})
