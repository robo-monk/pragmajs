import { Pragma } from "../dist"

test('load tests correctly', () => {
  p = new Pragma
  p.value = 420
  expect(p.value).toBe(420)
});
