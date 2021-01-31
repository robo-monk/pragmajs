import { _e, _p } from "../dist/pragma.esm"

describe("_e extends Element", () => {
  let e = _e("div", "inner texticles, suck my testicles")
  test(".text", () => {
    expect(e.text).toBe("inner texticles, suck my testicles")
  })
})

describe("_p correctly adopts _e getters", () => {
  let p = _p("meow").as(_e('div', 'dragon baboon'))
  expect(p.text).toBe("dragon baboon")
})

describe("_e class arrays'", () => {
  let e = _e('div', 'test') 
  e.addClass('one', 'two', 'three')
  e.removeClass('one', 'two')

  expect(e.classArray.length).toBe(1)

  e.toggleClass("one")
  expect(e.classArray.length).toBe(2)

   e.toggleClass("one")
  expect(e.classArray.length).toBe(1) 
})
