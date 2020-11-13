const assert = require('assert');
const { BloomFilter } = require('../src');

describe("Bloom Filter", () => {
  const myBloomFilter = new BloomFilter(100, 25);
  const t1 = "Genshin Impact"; const t2 = "Dead Cells"; const t3 = "Katana Zero"; const
    t4 = "Paladins";

  it("Insert a few values", () => {
    assert.doesNotThrow(() => {
      myBloomFilter.insert(t1);
      myBloomFilter.insert(t2);
    });
  });

  it("check for existence of an inserted value", () => {
    assert.strictEqual(myBloomFilter.exists(t1), 1);
    assert.strictEqual(myBloomFilter.exists(t2), 1);
  });

  it("Uninserted value should not exist (AKA True Negative)", () => {
    assert.strictEqual(myBloomFilter.exists(t3), 0);
    assert.strictEqual(myBloomFilter.exists(t4), 0);
  });

  it("Should have a low FPR rate (less that 10% clash)", () => {
    assert.notStrictEqual(myBloomFilter.FalsePositiveRate > 0.1, true);
  });
});
