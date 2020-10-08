const assert = require('assert');
const BloomFilter = require('../src').BloomFilter;

describe("Bloom Filter", () => {

    const myBloomFilter = new BloomFilter(100,5);
    const t1="Genshin Impact", t2="Dead Cells", t3="Katana Zero", t4="Paladins";

    it("Insert a few values",() =>{        
        assert.doesNotThrow(() => {
            myBloomFilter.insert(t1);
            myBloomFilter.insert(t2);            
        });
    });

    it("check for existence of an inserted value", () => {
        assert.strictEqual(myBloomFilter.exists(t1),1);
        assert.strictEqual(myBloomFilter.exists(t2),1);
    });

    it("Uninserted value should not exist (AKA True Negative)", () => {
        assert.strictEqual(myBloomFilter.exists(t3),0);
        assert.strictEqual(myBloomFilter.exists(t4),0);
    });
});
