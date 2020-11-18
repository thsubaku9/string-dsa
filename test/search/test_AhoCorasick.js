const assert = require("assert");
const AhoCorasick = require("../../src").AhoCorasick;

describe("Aho Corasick tests", () => {
    const keywordList = ["lemon","lemonade","monday","zebras"]
    const searchSpace = "lemon and lemonday is nice for zebzebras"
    const hitLocation = []
    var mySearcher = undefined;
    it("Insert the necessary keywords", () => {
        mySearcher = new AhoCorasick(keywordList);

        assert.deepStrictEqual(mySearcher.keyWords ,keywordList);
    })

    it("Should state the maximum number of required states",() => {
        assert.strictEqual(mySearcher.totalStates,keywordList.reduce((prevVal,currentVal) => prevVal + currentVal.length, 1))
    })

    it("Should state the actual number of used states",() =>{
        assert.strictEqual(mySearcher.totalStates >= mySearcher.states,true)
    })

    it("Find the matching keywords in given text", () => {
        assert.deepStrictEqual(mySearcher.find(searchSpace),hitLocation);
    })

})