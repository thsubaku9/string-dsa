const assert = require('assert');
const { kmp } = require("../../src");

describe('Knuth Morris Pratt', () => {
  const searchTerm1 = "cancan"; const searchTerm2 = "mixolydian"; const
    searchTerm3 = "pina";
  const searchSpace1 = "cancancan like a tin cancan?"; const searchSpace2 = "what even do you mean"; const
    searchSpace3 = "pina colada and what ?";

  it(`should return index of "${searchTerm1}" in three positions for "${searchSpace1}"`, () => {
    const result = kmp(searchTerm1, searchSpace1);
    assert.deepStrictEqual(result, [0, 3, 21]);
  });

  it(`should return [-1] for "${searchTerm2}" in "${searchSpace2}"`, () => {
    const result = kmp(searchTerm2, searchSpace2);
    assert.deepStrictEqual(result, [-1]);
  });

  it(`should return one index for "${searchTerm3}" in "${searchSpace3}" `, () => {
    const result = kmp(searchTerm3, searchSpace3);
    assert.deepStrictEqual(result, [0]);
  });

  it('should return [-1] if either the searchTerm or searchSpace is empty', () => {
    const resultOne = kmp("", searchSpace1);
    assert.deepStrictEqual(resultOne, [-1]);

    const resultTwo = kmp(searchTerm1, "");
    assert.deepStrictEqual(resultTwo, [-1]);
  });
});
