const assert = require("assert");
const { Suffix } = require("../../src");

describe("Tests related to SUFFIX Opertaions", () => {
  const st1 = "marijuana";
  const st2 = "bananas";
  const SA1 = new Suffix(st1); 
  const SA2 = new Suffix(st2);
  const sa_1 = [9, 8, 6, 1, 3, 4, 0, 7, 2, 5]; 
  const sa_2 = [7, 1, 3, 5, 0, 2, 4, 6];
  const lcp_1 = [0, 1, 1, 0, 0, 0, 0, 0, 0];
  const lcp_2 = [0, 3, 1, 0, 0, 2, 0];
  it("Find the suffix array given the string", () => {
    assert.deepStrictEqual(SA1.suffixArray(), sa_1);
    assert.deepStrictEqual(SA2.suffixArray(), sa_2);
  });

  it("Find the lcp array given the string", () => {
    assert.deepStrictEqual(SA1.computeLcpArray(), lcp_1);
    assert.deepStrictEqual(SA2.computeLcpArray(), lcp_2);
  });
});
