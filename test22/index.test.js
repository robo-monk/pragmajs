import { Pragma } from "../src22"

test.skip('load tests correctly', () => {
  let p = new Pragma
  p.value = 420
  expect(p.value).toBe(420)
});
