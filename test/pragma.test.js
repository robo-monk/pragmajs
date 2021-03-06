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