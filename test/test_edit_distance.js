const assert = require('assert');
const editDistance = require('../src').editDist;

describe("Edit Distance Test", () => {
  const st1 = "bike"; const st2 = "bichael"; const st3 = "chef"; const
    st4 = "chefery";
  it(`should return ${st3.length} for comparision between "" and ${st3}`, () => {
    const res = editDistance("", st3);
    assert.strictEqual(res, st3.length);
  });

  it(`should return 3 for comparision between ${st3} and ${st4}`, () => {
    const res = editDistance(st3, st4);
    assert.strictEqual(res, 3);
  });

  it(`should return 4 for comparision between ${st1} and ${st3}`, () => {
    const res = editDistance(st1, st3);
    assert.strictEqual(res, 4);
  });

  it(`should return 4 for comparision between ${st1} and ${st2}`, () => {
    const res = editDistance(st1, st2);
    assert.strictEqual(res, 4);
  });
});
