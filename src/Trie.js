"use strict";

/**Class implementation of Trie */
class Trie{
    /**
     * Instantiate your Trie class
     */
    constructor(){        
        this._rootNode = new Object();
        this._rootNode["$"] = false;        
    }

    /**
     * 
     * @param {String} searchTerm search term to be inserted into the trie
     */
    insertSingle(searchTerm){
        //use the root node, if current element isn't there add it;  go down the node and iterate over the word
        let currNode = this._rootNode;
        for (let j=0; j<searchTerm.length; j++){
            if(currNode[searchTerm.charAt(j)] == undefined){
                let newNode = new Object();
                newNode["$"] = false;
                currNode[searchTerm.charAt(j)] = newNode;
            }
            currNode = currNode[searchTerm.charAt(j)]
        }
        currNode["$"] = true;    
    }

    /**
     * 
     * @param {Array} searchList list of search terms to be inserted into the trie
     */
    insertList(searchList){
        for(let i=0; i<searchList.length; i++){
            this.insertSingle(searchList[i]);            
        }
    }

    /**
     * 
     * @param {String} searchTerm the search term to be removed from the given trie
     * 
     * @return {boolean} states whether all nodes related to search term were removed
     */
    removeSingle(searchTerm){
        this._removeSingle(searchTerm,this._rootNode,0);
    }

    _hasChildren(currentNode){
        let thisNodeChildren = 0;
        for (let x in currentNode){
            if (x == "$") thisNodeChildren += currentNode[x];
            else if(currentNode[x] != undefined) thisNodeChildren +=1;
            
        }
        return thisNodeChildren;
    }

    _removeSingle(searchTerm,currentNode,currentIter){
        //recursively dive deep; at reaching depth check if any more elements branch out from this node, if they do return false, else delete the node and return true. recursive step out            
        if(currentIter<searchTerm.length){
            if( currentNode[searchTerm[currentIter]] != undefined){
                let canRemove = this._removeSingle(searchTerm,currentNode[searchTerm[currentIter]],currentIter +1)                
                if(canRemove){                    
                    currentNode[searchTerm[currentIter]] = undefined;                    
                    return this._hasChildren(currentNode) == 0;
                }                
            }                         
        } else if(currentIter == searchTerm.length) {            
            currentNode["$"] = false            
            if( this._hasChildren(currentNode) == 0) {
                return true;
            } 
        }
        return false;
    }

    /**
     * 
     * @param {Array} searchList pass a List of search terms to be removed from the Trie
     */
    removeList(searchList){
        for( let i=0; i<searchList.length; i++){
            this.removeSingle(searchList[i]);
        }
    }

    /**
     * 
     * @param {String} searchSpace the text to be searched over
     * 
     * @returns {Array[]} where each index gives a start position and end position of the term
     */
    find(searchSpace){
        //iterate over all elements and match according to the trie created
        let returnArray = [];
        for(let i=0;i<searchSpace.length;i++){
            let currentNode = this._rootNode
            for(let j=i;j<searchSpace.length;j++){                
                if( currentNode[searchSpace[j]] != undefined ){
                    currentNode = currentNode[searchSpace[j]]
                } else {
                    break;
                }

                if(currentNode["$"] == true){
                    let position = []
                    position.push(i)
                    position.push(j)
                    returnArray.push(position)
                }
            }            
        }

        return returnArray
    }


    /**
     *  @returns {String[]} returns the array of all inserted elements
     */     
    listAllElements(){
        let elementList = []
        this._listFromNode(this._rootNode,elementList,"");
        return elementList;
    }

    _listFromNode(node,elementList,stringSeq){
        if (node["$"] == true){
            elementList.push(stringSeq);
        }
        for (let x in node){
            if(x != "$" && (node[x] != undefined)) this._listFromNode(node[x],elementList,stringSeq + x);                             
        }                        
    }
}

module.exports = Trie;