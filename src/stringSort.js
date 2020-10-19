//This is the best performing comparitive sort using n*l*log(n) timing
//TODO: Burst Sort and Cantor Hashing for optimized sorting

/**
 * Returns index wise sorted array for a string array
 * 
 * @param {object[]} stringArray an Array of Objects
 * @param {boolean} byIndex set true if you want results returned by index
 * @param {Function} compartorFn implement your custom comparatorFn here !
 * @returns {object[]} Array of index/object in sorted fashion
 */
function sort(stringArray, byIndex = false, compartorFn = null){
    if(stringArray.length <1) return [];
    
    const internalComp = compartorFn === null ? (x,y) => {
        let i=0;
        while(i<x.length && i<y.length){
            if (x.charCodeAt(i) != y.charCodeAt(i)){
                return (x.charCodeAt(i) - y.charCodeAt(i));
            } else {
                i++;
            }
        }
        return (x.length - y.length);
    } : compartorFn;
    indexArray = Array(stringArray.length);
    for (let i=0; i<stringArray.length; i++) indexArray[i] = i;

    let result = internalSort(indexArray,stringArray,internalComp);
        
    if(byIndex){
        return result;
    } else {
        valueResult = []
        for(let i=0; i<result.length ; i++){
            valueResult.push(stringArray[result[i]]);
        }
        return valueResult;
    }
}

function internalSort(indexArray,stringArray,internalComp){    
    if(indexArray.length == 1) {
        return indexArray;
    } else {
        let midpt = parseInt(indexArray.length/2);
        let grandMerge = []
        let leftAr = indexArray.slice(0,midpt)
        let rightAr = indexArray.slice(midpt,indexArray.length)

        let sortedLeft = internalSort(leftAr,stringArray,internalComp);
        let sortedRight = internalSort(rightAr,stringArray,internalComp);        

        while(sortedLeft.length && sortedRight.length){
            if(internalComp(stringArray[sortedLeft[0]],stringArray[sortedRight[0]]) <= 0) {
                grandMerge.push(sortedLeft[0]);
                sortedLeft = sortedLeft.slice(1);
            } else {
                grandMerge.push(sortedRight[0]);
                sortedRight = sortedRight.slice(1);                
            }
        }

        while(sortedLeft.length){
            grandMerge.push(sortedLeft[0]);
            sortedLeft = sortedLeft.slice(1);
        }

        while(sortedRight.length){
            grandMerge.push(sortedRight[0]);
            sortedRight = sortedRight.slice(1);
        }        
        //delete leftAr; delete rightAr;

        return grandMerge;
    }
}

/**
 * 
 * @param {object[]} array an Array of Objects
 * @param {Function} compartorFn comparator function
 * 
 * @returns {boolean} states whether the array is sorted or not
 */
function sorted(array, compartorFn = null){
    if (array.length <2 ) return true;

    const internalComp = compartorFn === null ? (x,y) => {
        let i=0;
        while(i<x.length && i<y.length){
            if (x.charCodeAt(i) != y.charCodeAt(i)){
                return (x.charCodeAt(i) - y.charCodeAt(i));
            } else {
                i++;
            }
        }
        return (x.length - y.length);
    } : compartorFn;

    for(let x=0; x<array.length-1; x++ )
    {
        if( internalComp(array[x],array[x+1]) >0) return false; 
    }
    return true;
}

module.exports = {
    sort: sort,
    sorted: sorted
};
