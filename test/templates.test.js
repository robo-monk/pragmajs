import { _p, tpl } from "../dist/pragma.esm"


describe(".export + .from", () => {
  test(".export", () => {
    let tick = false
    let a = _p().run(function(){
      this.bam = "boom"
      this.onExport(function(){
        tick = "tack" 
      })

      this.export('bam')
    })

    let b = _p('yoing').from(a)

    expect(b.bam).toBe("boom")
    expect(tick).toBe("tack")
    expect(a.isExported).toBe(true)
    expect(b.isExported).toBeFalsy()
  })
})




