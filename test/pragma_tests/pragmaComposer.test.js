import PragmaComposer from "../../src/"
// wfy test

test('Pragma composer is imported correctly', () => {
  expect(new PragmaComposer({}))
})

describe("Pragma composer builds correcly", () =>{
  let comp
  let obj

  function setup(map, obj={}) {
    comp = new PragmaComposer(map) 
    obj = obj
  }
  
  test("can exist with no elements", () => {
    setup({})
    expect(comp.children.length).toBe(0)
  })

  test.skip("can generate from simple map", () => {
    let element = {
      key: "sample",
      type: "choice",
      value: 1
    }
    setup({
      key: "value",
      type: "value",
      elements: [
        element, element, element
      ]
    })
    expect(comp.children.length).toBe(3)
  })

})
