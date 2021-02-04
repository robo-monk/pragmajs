import { util, _p, tpl } from "../dist/pragma.esm"

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

function testRandomness(algo, times, params=null){
    var times = times
    let rands = []

    let func = util[algo]
    while (times-- > 0){
        rands.push(func(params))
    }

    expect(hasDuplicates(rands)).toBeFalsy()
}

describe("rk", () => {

  test("rk8 is random enough", () => {
    testRandomness('rk8', 20000)
  })

  test("rk5 is random enough", () => {
    testRandomness('rk5', 10000)
  })

  test("rk16 is hella random", () => {
    testRandomness('rk', 500000, 16)
  })
})

