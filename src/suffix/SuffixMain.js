"use strict";

// const Suffix = require("./src/suffix").Suffixer
// mySfx = new Suffix("marijuana")

class Suffixer {
  constructor(mainString) {
    this.CHAR_LIM = 27;
    this.originalString = `${mainString.toLowerCase()}$`;

    this.order = new Array(this.originalString.length);
    this.class = new Array(this.originalString.length);
    this.lcpArray = new Array(this.originalString.length);
    this.suffixConstructed = false;
  }

  charOrder() {
    let charCount = new Array(this.CHAR_LIM);
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
      this.order[charCount[c]] = i;
    }
  }

  charClass() {
    let pos = 0; let
      classNumber = 0;
    this.class[this.order[pos]] = classNumber;
    pos++;
    while (pos < this.originalString.length) {
      if (this.originalString.charAt(this.order[pos - 1]) !== this.originalString.charAt(this.order[pos])) {
        classNumber += 1;
      }
      this.class[this.order[pos]] = classNumber;
      pos++;
    }
  }

  /*
  sortDouble(L) {
    let newOrder = new Array(this.originalString.length);

    return newOrder;
  }

  updateClass(L) {
    let newClass = new Array(this.originalString.length);

    return newClass;
  }
*/

  suffixArray() {
    if (this.suffixConstructed) return this.order;

    let L = 1;
    this.charOrder();
    this.charClass();
    while (L < this.originalString.length) {
      // this.order = this.sortDouble(L);
      // this.class = this.updateClass(L);
      L *= 2;
    }

    this.suffixConstructed = true;
    return this.order;
  }

  /*
    lcpArray(){
        if(!this.suffixConstructed) this.suffixArray()

        for (let i=0; i< this.originalString.length; i++) this.lcpArray[i] = 0

        // Do LCP stuff
    }
    */
}

module.exports = Suffixer;
