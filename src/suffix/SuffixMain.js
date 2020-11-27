"use strict";

// const Suffix = require("./src/suffix").SuffixOps
// mySfx = new Suffix("marijuana")
// mySfx.computeLcpArray()
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

  reverseIndexSA(){
    let iSA = new Array(this.order.length)

    for(let i=0; i<iSA.length; i++){
      iSA[this.order[i]] = i
    }

    return iSA
  }

  _computeLcp(i,j,lcp){
    let currentLcp= lcp > 0 ? lcp : 0    
        
    while ((i + currentLcp <this.originalString.length) && ( j + lcp <this.originalString.length)) {
      console.log(this.originalString.charAt(i + currentLcp) + "-"+ this.originalString.charAt(j + currentLcp))
      if(this.originalString.charAt(i + currentLcp) == this.originalString.charAt(j + currentLcp)){
        currentLcp += 1
      } else {
        break
      }
    }

    return currentLcp
  }

  computeLcpArray(){
    if (this.lcpConstructed) return this.lcpArray

    if(!this.suffixConstructed) this.suffixArray()
    for (let i=0; i< this.originalString.length-1; i++) this.lcpArray[i] = 0  
    
    let isa = this.reverseIndexSA();
    let s_len = this.originalString.length;
    let lcp = 0;    
    let suffix = this.order[0];
    //compute the lcp for the initial location
    for(let i=0; i< s_len; i++){      
      let pos = isa[suffix]            
      if(pos == s_len -1){
        console.log(`Suffix : ${suffix} | Position: ${pos}`)
        lcp = 0
        suffix = (suffix + 1) % s_len
        continue;
      }
      let nextSuffix = this.order[pos + 1]

      console.log(`Suffix : ${suffix} | Position: ${pos} | nextSuffix : ${nextSuffix}`)

      lcp = this._computeLcp(suffix,nextSuffix,lcp-1)
      this.lcpArray[pos] = lcp
      suffix = (suffix + 1) % s_len            

    }

    this.lcpConstructed = true
    return this.lcpArray
  }
  
}

module.exports = SuffixMain;
