"use strict";

class SuffixMain {
  constructor(mainString) {
    this.CHAR_LIM = 27;
    this.originalString = `${mainString.toLowerCase()}$`;

    this.order = new Array(this.originalString.length);
    this.class = new Array(this.originalString.length);
    this.lcpArray = new Array(this.originalString.length - 1);
    this.suffixConstructed = false;
    this.lcpConstructed = false;
  }

  /**
   * This function should be used to find monomer index based order array
   *
   * @returns {Array} returns the character order based array for the given string
   */
  charOrder() {
    let charCount = new Array(this.CHAR_LIM);
    let charOrderArray = new Array(this.originalString.length);
    for (let i = 0; i < this.CHAR_LIM; i++) charCount[i] = 0;

    for (let i = 0; i < this.originalString.length; i++) {
      if (this.originalString.charAt(i) === "$") {
        charCount[0] += 1;
      } else {
        charCount[this.originalString.charCodeAt(i) - "a".charCodeAt(0) + 1] += 1;
      }
    }

    for (let i = 1; i < this.CHAR_LIM; i++) {
      charCount[i] += charCount[i - 1];
    }

    for (let i = this.originalString.length - 1; i >= 0; i--) {
      let c;
      if (this.originalString.charAt(i) === "$") {
        c = 0;
      } else {
        c = this.originalString.charCodeAt(i) - "a".charCodeAt(0) + 1;
      }
      charCount[c] -= 1;
      charOrderArray[charCount[c]] = i;
    }

    return charOrderArray;
  }

  /**
   * This function should be used to find monomer classification array on an ordered array
   *
   * @returns {Array} returns the classification array for characters for the given string
   */
  charClass() {
    let charClassArray = new Array(this.originalString.length);

    charClassArray[this.order[0]] = 0;

    for (let i = 1; i < this.originalString.length; i++) {
      if (this.originalString.charAt(this.order[i - 1]) !== this.originalString.charAt(this.order[i])) {
        charClassArray[this.order[i]] = charClassArray[this.order[i - 1]] + 1;
      } else {
        charClassArray[this.order[i]] = charClassArray[this.order[i - 1]];
      }
    }

    return charClassArray;
  }

  /**
   * This function finds the 2*L-gram based sorted order array
   *
   * @param {Number} L the number of positions the start of the gram is located
   *
   * @returns {Array} the ordered 2*L-gram sorted index
   */
  sortDouble(L) {
    let newOrder = new Array(this.originalString.length);
    let count = new Array(this.originalString.length);
    for (let i = 0; i < this.originalString.length; i++) count[i] = 0;

    for (let i = 0; i < this.originalString.length; i++) {
      count[this.class[i]] += 1;
    }

    for (let i = 1; i < this.originalString.length; i++) {
      count[i] += count[i - 1];
    }

    for (let i = this.originalString.length - 1; i >= 0; i--) {
      let cyclicShiftPosition = (this.order[i] - L + this.originalString.length) % (this.originalString.length);
      let cl = this.class[cyclicShiftPosition];
      count[cl] -= 1;
      newOrder[count[cl]] = cyclicShiftPosition;
    }

    return newOrder;
  }

  /**
   * This function uodates the 2*L-gram based classification array
   *
   * @param {*} L the number of positions the start of the gram is located
   *
   * @returns {Array} the classified 2*L-gram array
   */
  updateClass(L) {
    let newClass = new Array(this.originalString.length);
    newClass[this.order[0]] = 0;

    for (let i = 1; i < this.originalString.length; i++) {
      let cur = this.order[i]; let
        prev = this.order[i - 1];
      let cyclicShiftPositionCur = (cur + L) % (this.originalString.length); let
        cyclicShiftPositionPrev = (prev + L) % (this.originalString.length);

      if (this.class[cur] != this.class[prev] || this.class[cyclicShiftPositionCur] != this.class[cyclicShiftPositionPrev]) {
        newClass[cur] = newClass[prev] + 1;
      } else {
        newClass[cur] = newClass[prev];
      }
    }
    return newClass;
  }

  /**
   * This function computes the suffixArray of the given string in linear time
   *
   * @returns {Array} indexed based suffix array
   */
  suffixArray() {
    if (this.suffixConstructed) return this.order;

    let L = 1;
    this.order = this.charOrder();
    this.class = this.charClass();
    while (L < this.originalString.length) {
      this.order = this.sortDouble(L);
      this.class = this.updateClass(L);
      L *= 2;
    }

    this.suffixConstructed = true;
    return this.order;
  }

  /**
   * This function maps the index to Suffix Array order
   *
   * @returns {Array} indexed based suffix array order
   */
  reverseIndexSA() {
    let iSA = new Array(this.order.length);

    for (let i = 0; i < iSA.length; i++) {
      iSA[this.order[i]] = i;
    }

    return iSA;
  }

  _computeLcp(i, j, lcp) {
    let currentLcp = lcp > 0 ? lcp : 0;

    while ((i + currentLcp < this.originalString.length) && (j + currentLcp < this.originalString.length)) {
      if (this.originalString.charAt(i + currentLcp) == this.originalString.charAt(j + currentLcp)) {
        currentLcp += 1;
      } else {
        break;
      }
    }

    return currentLcp;
  }

  /**
   * This function computes the LCP for given suffix array
   *
   * @returns {Array} LCP array
   */
  computeLcpArray() {
    if (this.lcpConstructed) return this.lcpArray;

    if (!this.suffixConstructed) this.suffixArray();
    for (let i = 0; i < this.originalString.length - 1; i++) this.lcpArray[i] = 0;

    let isa = this.reverseIndexSA();
    let s_len = this.originalString.length;
    let lcp = 0;
    let suffix = this.order[0];
    // compute the lcp for the initial location
    for (let i = 0; i < s_len; i++) {
      let pos = isa[suffix];
      if (pos == s_len - 1) {
        lcp = 0;
        suffix = (suffix + 1) % s_len;
        continue;
      }

      let nextSuffix = this.order[pos + 1];
      lcp = this._computeLcp(suffix, nextSuffix, lcp - 1);
      this.lcpArray[pos] = lcp;
      suffix = (suffix + 1) % s_len;
    }

    this.lcpConstructed = true;
    return this.lcpArray;
  }
}

module.exports = SuffixMain;
