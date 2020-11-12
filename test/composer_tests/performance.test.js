describe.skip("Pragma Composer stress test", () =>{
  let comp
  let obj
  let element = {
    key: "element"
  }

  function setup(map, obj={}) {
    comp = new PragmaComposer(map) 
    obj = obj
  }
  
  test("can exist with no elements", () => {
    setup({})
    expect(comp.children.length).toBe(0)
  })

  test("can generate from simple map", () => {
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
  test("can count correctly all children", () => {
    let subelement = {
      key: "subelement",
      type: "subelement",
    }
    let element = {
      key: "element",
      type: "choice",
      elements: [
       subelement 
      ],
      value: 1
    }
    setup({
      key: "master",
      type: "value",
      elements: [
        element, element, element
      ]
    })
    expect(comp.children.length).toBe(3)
    expect(comp.allChildren.length).toBe(6)
    //console.log(comp.shape)
  })
  test("can generate from more complex map", () => {
    let subsubelement = {
      key: "oof2",
      type: "value2"
    }
    let subelement = {
      key: "oof",
      type: "value",
      elements: [
        subsubelement, subsubelement, subsubelement 
      ]
    }
    let element = {
      key: "sample",
      type: "choice",
      elements: [
       subelement, subelement, subelement
      ],
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
    //console.log(comp.shape)
    console.log(comp.allChildren.length)
    expect(comp.allChildren.length).toBe(comp.shape.split("\n").length-2)
  })
})