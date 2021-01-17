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
