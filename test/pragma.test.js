import { Pragma, _p } from "../dist/pragma.esm"

describe("Pragma can be generated with Map", () => {
  let p = new Pragma({
    key: 'jeff',
    value: 0,
    children: [
      { key: "jeff's child", value: 420 },
      { key: "jeff's second child", value: 422 }
    ]
  })

  test("Can generate a Pragma with a map", () => {
    expect(p.value).toBe(0)
    expect(p.key).toBe("jeff")
  })
})


describe("Pragma's action chain works", () => {
  let p = new Pragma({
    key: "n",
    value: 0
  })

  test("Pragma's action gets triggered when value is changed", () => {

    let haha = 0
    p.do(function() {
      haha = this.value
    })

    p.value = 69
    expect(haha).toBe(69)
  })

  test("Manually execute Pragma's action with extra params", () => {
    let b = ""
    p.do((arg) => {b = arg })
    p.exec("piri")
    expect(b).toBe("piri")
  })

  test("All actions are getting called", () => {

    let a, b, c

    p.do((self, value) => {
      a = 1
    }).do((self, value) => {
      b = 1
    }).do((self, value) => {
      c = 1
    }).do(function() {
      this.nice = 42069
    })

    p.value = "yeehaw"

    expect(a).toBe(1)
    expect(b).toBe(1)
    expect(c).toBe(1)
    expect(p.nice).toBe(42069)
  })

})


describe("Pragmas can contain other pragmas", () => {
  test("Simple .contain", () => {
    var a, b, c, d, e
    a = new Pragma()
    b = new Pragma()
    b.contain(a)
    // console.log(b)
  })
})

describe("pragma.run", () => {
  let p = new Pragma()

  test("simple run", () => {
    let t
    p.run(function(){
      t = this.key
    })
    expect(t).toBe(p.key)
  })

  test("multiple run", () => {
    let randKey = "yehaww"
    p.run(function(){
      this.key = randKey
    }, function(){
      expect(this.key).toBe(randKey)
    }, function(){
      this.jeff = randKey
    })
    expect(p.jeff).toBe(randKey)
  })
  
  test('dictionary run', () => {
    p = new Pragma()
    let randKey = "meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    p.run({
      setKey(){
        this.key = randKey
      }, 
      expectKey(){
        expect(this.key).toBe(randKey)
      }, 
      jeffrey(){
        this.jeff = randKey
      }
    })
  })

})

describe("Pragma extend", () => {
  test('.extend', () => {
    let e = 0
    let p = _p('meow')
              .extend('setKey', function(key){
                this._setKey(key)
                e = 1
                return this
              })
              .setKey('yeet')
    
    expect(p.key).toBe('yeet')
    expect(e).toBe(1)
  })

})

describe("Pragma .on", () => {
  let p = _p('yoing')
  p.createEvent('yoing')
  test('custom event, singular action', () => {
    let value = 69


    p.on('yoing', () => {
      value = 420
    })

    p.triggerEvent('yoing')

    expect(value).toBe(420)
  })

  test('onNext custom event', () => {
    let value = 69
    p.onNext('yoing', () => {
      value ++
    })

    p.triggerEvent('yoing')
    p.triggerEvent('yoing')
    p.triggerEvent('yoing')

    expect(value).toBe(70)
  })
})

describe("Pragma wire", () => {
  test('monitor custom variable', () => {
    let p = _p('custom')
    let test = 42
    p.createWire('index')

    p.on('indexChange', (value, lastValue) => {
      test = value
    }).setIndex(69)

    expect(test).toBe(69)
  

    p.setIndexSilently(0)
    expect(test).toBe(69)

    p.index = 0
    expect(test).toBe(69)
  })

  test.skip('.setWireRange', () => {
    let p = _p() 
    p.createWire("suck")
      .setSuckRange(1, 10)

    p.setSuck(0)
    expect(p.suck).toBeUndefined()

    p.setSuck(1)
    for (let i=0; i<100; i++){
      p.suck += 1 
    }

    expect(p.suck).toBe(10)
  })

  test('.setWireLoop', () => {
    let p = _p()
    p.createWire('suck')
      .setSuckLoop(42, 69)

    p.suck = 0
    expect(p.suck).toBe(69)

    p.suck = 420
    expect(p.suck).toBe(42)
  })
})


