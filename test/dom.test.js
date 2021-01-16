import { parseQuery } from "../src/core/util/index"

describe("can parse [ div#id.class ] queries", () => {
  test("query 1", () => {
    let d =  parseQuery("tag#id.class")
    expect(d.tag).toBe("tag")
    expect(d.id).toBe("id")
    expect(d.class.length).toBe(1)
    expect(d.class[0]).toBe("class")
  })
  test("query 2", () => {
    let d =  parseQuery("#YEEET.class.KROQ", "FUCK")
    expect(d.tag).toBe("FUCK") // default tag option works
    expect(d.id).toBe("YEEET")
    expect(d.class.length).toBe(2)
    expect(d.class[1]).toBe("KROQ")
  })
})
