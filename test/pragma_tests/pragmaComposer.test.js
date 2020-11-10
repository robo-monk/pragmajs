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
    expect(comp.allChildren).toBe(39)
  })
})
describe("is correctly connected to its children", () => {
  let comp
  let obj
  let subsubelement
  let subelement
  let element

  function setup(map, obj={}) {
    comp = new PragmaComposer(map) 
    obj = obj
  }
  beforeEach(()=>{
    subsubelement = {
      key: "oof-2",
      type: "value",
      value: 2
    }
    subelement = {
      key: "oof-1",
      type: "value",
      value: 1,
      elements: [
        subsubelement 
      ]
    }
    element = {
      key: "sample-420",
      type: "choice",
      elements: [
       subelement 
      ],
      value: 420
    }
    setup({
      key: "tester-69",
      type: "value",
      value: 69,
      elements: [
        element
      ]
    })

  })

  test("children dont have access to higher parents", () => {
    expect(comp.find("oof-1").find("sample-420")).toBeFalsy()
  })
  test("can store values to its children", () => {
    expect(comp.value).toBe(69)
    expect(comp.find("oof-1").value).toBe(1)
    expect(comp.find("sample-420").value).toBe(420)
    expect(comp.find("oof-1").value).toBe(1)
  })
})
