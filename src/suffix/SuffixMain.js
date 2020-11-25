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
    this.class[this.order[0]] = 0;
    for(let i = 1; i<this.originalString.length; i++){
        if (this.originalString.charAt(this.order[i - 1]) !== this.originalString.charAt(this.order[i])) {
            this.class[this.order[i]] = this.class[this.order[i-1]] + 1;
        } else {
            this.class[this.order[i]] = this.class[this.order[i-1]];
        }          
    }    
  }

  
  sortDouble(L) {
    let newOrder = new Array(this.originalString.length);
    let count = new Array(this.originalString.length);
    for (let i = 0; i < this.originalString.length; i++) count[i] = 0;
    
    for(let i=0; i<this.originalString.length; i++){
        count[this.class[i]] += 1
    }

    for(let i=1; i<this.originalString.length; i++){
        count[i] += count[i-1]
    }

    for(let i = this.originalString.length -1; i>=0; i--){
        let cyclicShiftPosition = (this.order[i] - L + this.originalString.length) % (this.originalString.length)
        let cl = this.class[cyclicShiftPosition]
        count[cl] -= 1
        newOrder [count[cl]] = cyclicShiftPosition
    }
    
    return newOrder;
  }

  updateClass(L) {
    let newClass = new Array(this.originalString.length);
    newClass[this.order[0]] = 0

    for(let i=1; i<this.originalString.length; i++){
        let cur = this.order[i], prev = this.order[i-1]
        let cyclicShiftPositionCur = (cur + L) % (this.originalString.length) ,cyclicShiftPositionPrev = (prev + L ) % (this.originalString.length)

        if(this.class[cur] != this.class[prev] || this.class[cyclicShiftPositionCur] != this.class[cyclicShiftPositionPrev]){
            newClass[cur] = newClass[prev] + 1
        } else {
            newClass[cur] = newClass[prev]
        }
    }
    return newClass;
  }


  suffixArray() {
    if (this.suffixConstructed) return this.order;

    let L = 1;
    this.charOrder();
    this.charClass();
    while (L < this.originalString.length) {
       this.order = this.sortDouble(L);
       this.class = this.updateClass(L);
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
