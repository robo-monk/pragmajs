import { TestScheduler } from "jest"
import { Pragma } from "../dist/pragma.esm"

describe("Pragma can be generated with Map", () => {
  let p = new Pragma({
    id: 'jeff',
    value: 0,
    children: [
      { id: "jeff's child", value: 420 },
      { id: "jeff's second child", value: 422 }
    ]
  })

  test("Can generate a Pragma with a map", () => {
    expect(p.value).toBe(0) 
    expect(p.id).toBe("jeff") 
    console.log(p.children)
  })
})
