import { Script } from "../dist/pragma.esm"

describe("Script.load(url, name)", () => {
  test("lectorjs", () => {
    expect(typeof lectorjs).toBe("undefined")
    Script.load("https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js").then(() => {
      expect(lectorjs).toBeTruthy()
    })
  })

  test("react promise", async () => {
    Script.load("https://unpkg.com/react/umd/react.development.min.js").then(() => {
      expect(react).toBeTruthy()
    })
  })
})


