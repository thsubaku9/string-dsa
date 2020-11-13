const assert = require('assert');
const { bracketBalance } = require('../src');

describe("Bracket Balanced", () => {
  const searchSpace1 = "[[[]]]]"; const searchSpace2 = "I am (an) as{s}guardian"; const searchSpace3 = "the [code] {speaker} of nativity {nirvana] is (here"; const searchSpace4 = "( what if i get (comfortable";

  it("Returns false due to extra closing bracket", () => {
    assert.strictEqual(bracketBalance(searchSpace1), false);
  });

  it("Returns true due to balance", () => {
    assert.strictEqual(bracketBalance(searchSpace2), true);
  });

  it("Returns false due to misbalance", () => {
    assert.strictEqual(bracketBalance(searchSpace3), false);
  });

  it("Returns false due to all opening brackets", () => {
    assert.strictEqual(bracketBalance(searchSpace4), false);
  });

  it("Returns false due to no search space", () => {
    assert.strictEqual(bracketBalance(""), false);
  });
});
