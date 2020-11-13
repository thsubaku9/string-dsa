const assert = require('assert');
const { lcs } = require('../src');

describe("Tests related to Largest Common SubSequence", () => {
  const st1 = "bananas";
  const st2 = "panama";
  const st3 = "ppp";
  const st4 = "ananas";
  it(`should return 0 for lcs of ${""} and ${""} -> Handles empty string case`, () => {
    const res = lcs("", "");
    assert.strictEqual(res, 0);
  });

  it(`should return ${st1.length} for lcs of ${st1} and ${st1} -> Handles complete overlap case`, () => {
    const res = lcs(st1, st1);
    assert.strictEqual(res, st1.length);
  });

  it(`should return 4 for lcs of ${st1} and ${st2} -> handles partial overlap case`, () => {
    const res = lcs(st1, st2);
    assert.strictEqual(res, 4);
  });

  it(`should return 0 for lcs of ${st1} and ${st3} -> handles no overlap case`, () => {
    const res = lcs(st1, st3);
    assert.strictEqual(res, 0);
  });

  it(`should return 6 for lcs of ${st1} and ${st4} -> handles partial overlap case`, () => {
    const res = lcs(st1, st4);
    assert.strictEqual(res, 6);
  });

  it(`should return 1 for lcs of ${st2} and ${st3} -> handles repetative letter case`, () => {
    const res = lcs(st2, st3);
    assert.strictEqual(res, 1);
  });
});
