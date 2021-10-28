const assert = require('assert');
const { Ctrie } = require('../src');

describe("Compact Trie based tests", () => {
  const myT = new Ctrie();
  const st1 = "can";
  const st2 = "candy";
  const st3 = "ban";
  const na1 = "batman";
  const searchSpace = "can the real candy ban?";
  const resultPos = [[0, 2], [13, 15], [13, 17], [19, 21]];

  it("should insert a bunch of keys", () => {
    myT.insert(st1);
    myT.insert(st2);
    myT.insert(st3);

    assert.equal(myT.contains(st1), true);
    assert.equal(myT.contains(st2), true);
    assert.equal(myT.contains(st3), true);
    assert.equal(myT.contains(na1), false);
  });

  it("should find correct locations of searchSpace", () => {
    const res = myT.find(searchSpace);
    assert.deepStrictEqual(res, resultPos);
  });

  it("remove given keys", () => {
    myT.remove(st2);
    myT.remove(st3);

    assert.equal(myT.contains(st1), true);
    assert.equal(myT.contains(st2), false);
    assert.equal(myT.contains(st3), false);

    myT.insert(st2);
    myT.insert(st3);
  });
});
