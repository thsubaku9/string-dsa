const assert = require('assert');
const { Trie } = require('../src');

describe("Trie based tests", () => {
  const myT = new Trie();
  const st1 = "can";
  const st2 = "candy";
  const st3 = "ban";
  const na1 = "batman";
  const searchSpace = "can the real candy ban?";
  const resultPos = [[0, 2], [13, 15], [13, 17], [19, 21]];
  const existResult = [true, true, true, false];
  const orderedKeys = [st3,st1,st2];

  it("should insert a bunch of keys", () => {
    myT.insertList([st1, st2, st3]);
    assert.deepStrictEqual(myT.listAllElements(), [st1, st2, st3]);
  });

  it("should find correct locations of searchSpace", () => {
    const res = myT.find(searchSpace);
    assert.deepStrictEqual(res, resultPos);
  });

  it("remove given keys", () => {
    myT.removeList([st2, st3]);
    assert.deepStrictEqual(myT.listAllElements(), [st1]);
    myT.insertList([st2, st3]);
  });

  it("should check whether the given keys exist or not", () => {
    const res = myT.containsList([st1, st2, st3, na1]);
    assert.deepStrictEqual(res, existResult);
  });

  it("should perform burstsort properly",() =>{
    const res = myT.burstSort();
    assert.deepStrictEqual(res,orderedKeys);
  });
});
