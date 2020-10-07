const rabin_karp = require("../../src").rabinKarp
const assert = require('assert');


describe('Rabin Karp', () => {
    
    const searchTerm1 = "cancan", searchTerm2 = "mixolydian", searchTerm3 = "pina";
    const searchSpace1 = "cancancan like a tin cancan?", searchSpace2 = "what even do you mean", searchSpace3 = "pina colada and what ?";

    it(`should return index of \"${searchTerm1}\" in three positions for \"${searchSpace1}\"`, () => {      
  
        const result = rabin_karp(searchTerm1,searchSpace1)
        assert.deepStrictEqual(result, [0,3,21]);
    });
  
    it(`should return [-1] for \"${searchTerm2}\" in \"${searchSpace2}\"`, () => {      
  
        const result = rabin_karp(searchTerm2,searchSpace2)
        assert.deepStrictEqual(result, [-1]);
    });
  
    it(`should return one index for \"${searchTerm3}\" in \"${searchSpace3}\" `, () => {
        
        const result = rabin_karp(searchTerm3,searchSpace3)
        assert.deepStrictEqual(result, [0]);
    });

    it('should return [-1] if either the searchTerm or searchSpace is empty', () => {

        const resultOne = rabin_karp("",searchSpace1);
        assert.deepStrictEqual(resultOne, [-1]);

        const resultTwo = rabin_karp(searchTerm1,"");
        assert.deepStrictEqual(resultTwo, [-1]);
    });      
});
