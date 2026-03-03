import { add } from "../services/math.js";

// test("adds two numbers correctly", () => {
// 	assert.strictEqual(add(2, 3), 5);
// });

test("adds two numbers", () => {
	expect(add(2, 3)).toBe(5);
});
