const assert = require('assert');
const { burstSort, customSort, sorted } = require('../src');

describe("Custom String Sorting", () => {
  const unsortedArr = ["its", "the", "its", "the", "rick", "dance"];
  const burstUnsortedArr = ["can", "batman", "animate", "hippies"];
  const reverseComparator = (y, x) => {
    let i = 0;
    while (i < x.length && i < y.length) {
      if (x.charCodeAt(i) != y.charCodeAt(i)) {
        return (x.charCodeAt(i) - y.charCodeAt(i));
      }
      i++;
    }
    return (x.length - y.length);
  };

  it(`should return correct indices for the array ${unsortedArr}`, () => {
    const res = customSort(unsortedArr, true);
    assert.deepStrictEqual(res, [5, 0, 2, 4, 1, 3]);
  });

  it(`should return correct sorted order for the array ${unsortedArr}`, () => {
    const res = customSort(unsortedArr, false);
    assert.deepStrictEqual(res, ['dance', 'its', 'its', 'rick', 'the', 'the']);
  });

  it(`should return correct descending sort for the array ${unsortedArr}`, () => {
    const res = customSort(unsortedArr, false, reverseComparator);
    assert.deepStrictEqual(res, ['the', 'the', 'rick', 'its', 'its', 'dance']);
  });

  it(`should return [] for empty array`, () => {
    const res = customSort([], false);
    assert.deepStrictEqual(res, []);
  });

  it(`should return false for unsorted array`, () => {
    const res = sorted(unsortedArr);
    assert.deepStrictEqual(res, false);
  });

  it(`should return true for sorted array`, () => {
    const res = sorted(customSort(unsortedArr, false));
    assert.deepStrictEqual(res, true);
  });

  it("should perform burstsort properly",() =>{
    const res = burstSort(burstUnsortedArr);
    const res2 = customSort(burstUnsortedArr,false);
    assert.deepStrictEqual(res,res2);
  }); 

});
