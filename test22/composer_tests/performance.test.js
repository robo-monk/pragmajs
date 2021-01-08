import { Variants, Comp, Select, Compose, contain } from "../../src"
import bigdemo from "../../docs/demos/bigdemo.js"

function bench(cb){
  let time = new Date().getTime()
  cb()
  let performancems = new Date().getTime() - time
  return performancems
}
describe.skip("Pragma Composer stress test", () =>{
  test("stress test", () => {
    let pf = bench(bigdemo)
    console.log(pf)
    expect(pf).toBeLessThan(100) // generate this in under 100 milliseconds
  }),
  test("find()", () => {
    let ms = 0
    let d = bigdemo(document.body, (master) => {
      ms = bench(()=>{
        master.find("adkfakldjfkadfjafd")
        master.find("readerfont")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm-")
        master.find("wpm+")
        master.find("wpm-")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm-")
        master.find("wpm-")
        master.find("wpm-")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm+")
        master.find("wpm+")
        master.find("markercolors")
        master.find("markercolors")
      })
    })
    expect(ms).toBeLessThan(10)
  })
})
