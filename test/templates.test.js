import { _p, util } from "../dist/pragma.esm"


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


describe(".export + .import", () => {

  test('simple import',() => {
    let tpl1 = () => _p()
      .run(function(){
        this.bam = "boom"
        this.export('bam')
      })

    let p = _p().import(tpl1) // tpl1 is a callback, should work

    expect(p.bam).toBe('boom')
  })

  test('2 imports',() => {
    let test = 0

    let tpl1 = _ => _p().run(function(){
      this.bam = "boom"
      this.export('bam')

      this.onExport(function(){
        test += 1
      })
    })

    let tpl2 = _ => _p().run(function(){
      this.boom = 'bam'
      this.export('boom')

      this.onExport(function(pragma){
        pragma.yeet = 'yote'
      })
    })

    let p = _p().import(tpl1, tpl2) // tpl1 is a callback, should work

    expect(p.bam).toBe('boom')
    expect(p.boom).toBe('bam')
    expect(p.yeet).toBe('yote')
  })


})

