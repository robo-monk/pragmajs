// import { Script, _e } from "../dist/pragma.esm"
import { Script, _e } from "../src/index"

async function expectInABit(what, time = 500) {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })

  if (typeof what === 'function') what = what()

  return expect(what)
}

describe("Script.load(src, name)", () => {  
  test("doesn't load same script twice",  () => {
      // expect(_e('head').findAll('script').length).toBe(0)
      // console.log(Script.load)
      Script.load("https://unpkg.com/react/umd/react.development.min.js", 'react')
      Script.load("https://unpkg.com/react/umd/react.development.min.js", 'react')
      Script.load("https://unpkg.com/react/umd/react.development.min.js", 'yeet')
      Script.load("https://unpkg.com/react/umd/react.development.min.js", 'react')
      Script.load("https://unpkg.com/react/umd/react.development.min.js", 'sheeesh')
      return new Promise(async resolve => {
         (await expectInABit(_ => _e('head').findAll('script').length))
                          .toBe(1)

                          resolve()
      })

      

      // Script.load("https://unpkg.com/react/umd/react.development.min.js")
      // Script.load("https://unpkg.com/react/umd/react.development.min.js")
      // Script.load("https://unpkg.com/react/umd/react.development.min.js")
      // expect(_e('head').findAll('script').length).toBe(1)

      // Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js")
      // expect(lectorjs).toBeTruthy()
      // Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js")
      // Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js")
      // Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js")
      // expect(lectorjs).toBeTruthy()
      // expect(react).toBeTruthy()

      // expect(_e('head').findAll('script').length).toBe(2)
  })

  test("doesn't load same script twice event after a fuckup",  () => {
      // expect(_e('head').findAll('script').length).toBe(0)
      // console.log(Script.load)
      Script.load("https://unpkg.com/react/umd/react.development.min.js", 'react')
      Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js")
      Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js")
      Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js")
      Script.load("https://unpkg.com/react/umd/react.development.min.js", 'react')
      Script.load("https://unpkg.com/react/umd/react.development.min.js", 'yeet')
      Script.load("https://unpkg.com/react/umd/react.development.min.js", 'react')
      Script.load("https://unpkg.com/react/umd/react.development.min.js", 'sheeesh')
      return new Promise(async resolve => {
         (await expectInABit(_ => _e('head').findAll('script').length))
                          .toBe(2)
                          resolve()
      })

      

      // Script.load("https://unpkg.com/react/umd/react.development.min.js")
      // Script.load("https://unpkg.com/react/umd/react.development.min.js")
      // Script.load("https://unpkg.com/react/umd/react.development.min.js")
      // expect(_e('head').findAll('script').length).toBe(1)

      // Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js")
      // expect(lectorjs).toBeTruthy()
      // Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js")
      // Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js")
      // Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js")
      // expect(lectorjs).toBeTruthy()
      // expect(react).toBeTruthy()

      // expect(_e('head').findAll('script').length).toBe(2)
  })



})


