"use strict";

class Node {
    constructor(isTerminal = false) {
        this.nextNode = new Map();
        this.edgeValue = new Map();
        this.$ = isTerminal;
    }
}

/** Class implementation of Compressed Trie */
class Ctrie {
    /**Instantiate your Ctrie */
    constructor() {
        this._rootNode = new Node();
    }

    /**
     *
     * @param {String} term search term to be inserted into the trie
     */
    insert(term) {
        // tracking variables
        let cNode = this._rootNode

        for(let pos = 0 ; pos < term.length; pos++) {
            let char = term[pos] 
            if(cNode.edgeValue.get(char)) { // find common prefix and then branch accordingly
                let edgeString = cNode.edgeValue.get(char)
                // find prefix
                let _prefix = this._findPrefix(edgeString,term.substring(pos))
                //get prefix-suffix
                let ePrefix = edgeString.substring(0,_prefix)
                let eSuffix =  edgeString.substring(_prefix)
                // update cNode and pos                
                if (ePrefix == edgeString) {
                    // just go to the next node
                    cNode = cNode.nextNode.get(char)
                } else { // case where ePrefix < len(edgeString)                    
                    cNode.edgeValue.set(char,ePrefix)
                    let _cascadeNode = cNode.nextNode.get(char)
                    let _newNode = new Node();
                    _newNode.nextNode.set(eSuffix[0],_cascadeNode)
                    _newNode.edgeValue.set(eSuffix[0],eSuffix)
                    cNode.nextNode.set(char,_newNode);
                    cNode = _newNode
                }

                pos += _prefix - 1            
            } else { // insert the substring into this entry                
                cNode.edgeValue.set(char,term.substring(pos))
                cNode.nextNode.set(char,new Node(true))
                break;
            }
        }
    }

    _findPrefix(t1,t2) {
        for(let i=0; i< t1.length && i< t2.length; i++) {
            if (t1[i] != t2[i]) return i;
        }

        return t1.length > t2.length ? t2.length : t1.length
    }

    /**
     *
     * @param {String} term search term to be inserted into the trie
     */
    remove(term) {
        let cNode = this._rootNode
        this._remove(term,cNode,0)
    }

    _remove(term,currentNode,offset) {

    }

    /**
     *
     * @param {String} term search term to be inserted into the trie
     */
    find(searchSpace) {
        const returnArray = [];
        for( let i = 0; i<searchSpace.length; i++) {
            let j = i
            let cNode = this._rootNode
            //compare from current location with the cTrie
            while (j < searchSpace.length && cNode) {                
                let edgeString = cNode.edgeValue.get(searchSpace[j])
                if (edgeString == undefined) break;

                console.log(`hit on ${searchSpace[j]}`)
                let k;
                for (k = 0; k<edgeString.length && j+k<searchSpace.length && edgeString[k] == searchSpace[j+k]; k++) console.log(`matched on ${edgeString[k]}`);

                if (k < edgeString.length) break;
                            
                cNode = cNode.nextNode.get(edgeString[0])
                j += k                
                if (cNode?.$) returnArray.push([i,j - 1])              
            }
        }
        return returnArray
    }

    /**
     *
     * @param {String} term search term to be looked up in the structure
     * 
     * @returns {Boolean} 
     */
    contains(term) {
        let cNode = this._rootNode

        // for each iteration check whether prefix match happens or not. update pos accordingly
        for(let pos = 0 ; pos< term.length; pos++) {
            let char = term[pos]
            let edgeString = cNode.edgeValue.get(char)

            if (edgeString == undefined) return false

            let prefix = this._findPrefix(edgeString,term.substring(pos))
            pos += prefix - 1 
            cNode = cNode.nextNode.get(char)
        }

        return cNode.$
    }    
}

module.exports = Ctrie