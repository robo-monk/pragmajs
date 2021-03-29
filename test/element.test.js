import { _e, _p, html } from "../dist/pragma.esm"

describe("_e extends Element", () => {
  let e = _e("div", "inner texticles, suck my testicles")
  test(".text", () => {
    expect(e.text).toBe("inner texticles, suck my testicles")
  })
})

test("_p correctly adopts _e getters", () => {
  let p = _p("meow").as(_e('div', 'dragon baboon'))
  expect(p.text).toBe("dragon baboon")
})

test("_e can be generated from html snippent", () => {
  let e = html`
    <div id='yoing'>This is a document</div>
  `.appendTo('body')
  
  expect(e.text).toBe('This is a document')
})

describe("_e find & query", () => {
 test("_e find all", () => {
    let e = _e('div.', 'test') 
    let e1 = _e('div.', 'test') 
    let e2 = _e('div.', 'test') 
    let e3 = _e('div.', 'test') 
    e.append(e1, e2, e3)

    e.findAll('div').forEach(el => {
      el.html('42069')
    })

    expect(e3.html()).toBe('42069')
    expect(e2.html()).toBe('42069')
    expect(e1.html()).toBe('42069')
  })
 
})

test("_e appends multiple _e", () => {
  let e = _e('div.', 'test') 
  let e1 = _e('div.', 'test') 
  let e2 = _e('div.', 'test') 
  let e3 = _e('div.', 'test') 
  e.append(e1, e2, e3)
  expect(e.childrenArray.length).toBe(3)
})

test("_e class arrays'", () => {
  let e = _e('div.', 'test') 
  e.addClass('one', 'two', 'three')
  e.removeClass('one', 'two')

  expect(e.classArray.length).toBe(1)

  e.toggleClass("one")
  expect(e.classArray.length).toBe(2)

   e.toggleClass("one")
  expect(e.classArray.length).toBe(1) 
})
