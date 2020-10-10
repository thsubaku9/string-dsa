const sort = require('../src').customSort;
const assert = require('assert');

describe("Custom String Sorting",() => {

    const unsortedArr = ["its","the","its","the","rick","dance"];
    const reverseComparator = (y,x) =>{
        let i=0;
        while(i<x.length && i<y.length){
            if (x.charCodeAt(i) != y.charCodeAt(i)){
                return (x.charCodeAt(i) - y.charCodeAt(i));
            } else {
                i++;
            }
        }
        return (x.length - y.length);        
    };

    it(`should return correct indices for the array ${unsortedArr}`,() => {
        const res = sort(unsortedArr,true);
        assert.deepStrictEqual(res,[ 5, 0, 2, 4, 1, 3 ]);
    });

    it(`should return correct sorted order for the array ${unsortedArr}`,() => {
        const res = sort(unsortedArr,false);
        assert.deepStrictEqual(res,[ 'dance', 'its', 'its', 'rick', 'the', 'the' ]);
    })

    it(`should return correct descending sort for the array ${unsortedArr}`,() => {
        const res = sort(unsortedArr,false,reverseComparator);
        assert.deepStrictEqual(res,[ 'the', 'the', 'rick', 'its', 'its', 'dance' ]);
    })

    it(`should return [] for empty array`,() => {
        const res = sort([],false);
        assert.deepStrictEqual(res,[]);
    })
});
