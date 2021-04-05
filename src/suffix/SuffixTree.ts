"use strict";

import SuffixMain from "./SuffixMain";

class SuffixTree {
    input : String;
    sa : Array<Number>;
    lcp : Array<Number>;

    constructor(input: String){
        this.input = input;
        this._initializeMetaSuffix();
    }

    protected _initializeMetaSuffix() : void {
        var SA : SuffixMain = new SuffixMain(this.input);;
        SA.suffixArray();
        SA.computeLcpArray();
        this.sa = SA.order;
        this.lcp = SA.lcpArray;
    }

}

module.exports = SuffixTree
