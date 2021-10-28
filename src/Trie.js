"use strict";

/** Class implementation of Trie */
class Trie {
  /**
     * Instantiate your Trie class
     */
  constructor() {
    this._rootNode = new Object();
    this._rootNode.$ = false;
  }

  /**
     *
     * @param {String} searchTerm search term to be inserted into the trie
     */
  insertSingle(searchTerm) {
    // use the root node, if current element isn't there add it;  go down the node and iterate over the word
    let currNode = this._rootNode;
    for (let j = 0; j < searchTerm.length; j++) {
      if (currNode[searchTerm.charAt(j)] == undefined) {
        const newNode = new Object();
        newNode.$ = false;
        currNode[searchTerm.charAt(j)] = newNode;
      }
      currNode = currNode[searchTerm.charAt(j)];
    }
    currNode.$ = true;
  }

  /**
     *
     * @param {Array} searchList list of search terms to be inserted into the trie
     */
  insertList(searchList) {
    for (let i = 0; i < searchList.length; i++) {
      this.insertSingle(searchList[i]);
    }
  }

  /**
     *
     * @param {String} searchTerm the search term to be removed from the given trie
     *
     * @return {boolean} states whether all nodes related to search term were removed
     */
  removeSingle(searchTerm) {
    this._removeSingle(searchTerm, this._rootNode, 0);
  }

  _hasChildren(currentNode) {
    let thisNodeChildren = 0;
    for (const x in currentNode) {
      if (x == "$") thisNodeChildren += currentNode[x];
      else if (currentNode[x] != undefined) thisNodeChildren += 1;
    }
    return thisNodeChildren;
  }

  _removeSingle(searchTerm, currentNode, currentIter) {
    // recursively dive deep; at reaching depth check if any more elements branch out from this node, if they do return false, else delete the node and return true. recursive step out
    if (currentIter < searchTerm.length) {
      if (currentNode[searchTerm[currentIter]] != undefined) {
        const canRemove = this._removeSingle(searchTerm, currentNode[searchTerm[currentIter]], currentIter + 1);
        if (canRemove) {
          currentNode[searchTerm[currentIter]] = undefined;
          return this._hasChildren(currentNode) == 0;
        }
      }
    } else if (currentIter == searchTerm.length) {
      currentNode.$ = false;
      if (this._hasChildren(currentNode) == 0) {
        return true;
      }
    }
    return false;
  }

  /**
     *
     * @param {Array} searchList pass a List of search terms to be removed from the Trie
     */
  removeList(searchList) {
    for (let i = 0; i < searchList.length; i++) {
      this.removeSingle(searchList[i]);
    }
  }

  /**
     *
     * @param {String} searchSpace the text to be searched over
     *
     * @returns {Array[]} where each index gives a start position and end position of the term
     */
  find(searchSpace) {
    // iterate over all elements and match according to the trie created
    const returnArray = [];
    for (let i = 0; i < searchSpace.length; i++) {
      let currentNode = this._rootNode;
      for (let j = i; j < searchSpace.length; j++) {
        if (currentNode[searchSpace[j]] != undefined) {
          currentNode = currentNode[searchSpace[j]];
        } else {
          break;
        }

        if (currentNode.$ == true) {
          returnArray.push([i, j]);
        }
      }
    }

    return returnArray;
  }

  /**
     *  @returns {String[]} returns the array of all inserted elements
     */
  listAllElements() {
    const elementList = [];
    this._listFromNode(this._rootNode, elementList, "");
    return elementList;
  }

  _listFromNode(node, elementList, stringSeq) {
    if (node.$ == true) {
      elementList.push(stringSeq);
    }
    for (const x in node) {
      if (x != "$" && (node[x] != undefined)) this._listFromNode(node[x], elementList, stringSeq + x);
    }
  }

  /**
     *
     * @param {String} searchTerm
     *
     * @return  {Boolean} States whether the given search term exists or not
     */
  contains(searchTerm) {
    let currentNode = this._rootNode;
    for (let k = 0; k < searchTerm.length; k++) {
      if (currentNode[searchTerm[k]] == undefined) {
        return false;
      }
      currentNode = currentNode[searchTerm[k]];
    }
    return currentNode.$ == true;
  }

  /**
     *
     * @param {String[]} searchList List of all strings to be seached for existence
     *
     * @returns {Boolean[]} States whether the given search terms exist or not
     */
  containsList(searchList) {
    const res = [];
    for (let i = 0; i < searchList.length; i++) {
      res.push(this.contains(searchList[i]));
    }
    return res;
  }

  /**
   * @returns {String[]} returns the ordered value of keys using BurstSort
   */
  burstSort() {
    const arr = [];
    this._burstSortInternal(this._rootNode, arr, "");
    return arr;
  }

  _burstSortInternal(node, arr, collectorString) {
    let c;
    if (node.$ === true) arr.push(collectorString);

    // Numerics
    for (let i = 0; i < 10; i++) {
      c = String(0 + i);
      if (node[c] !== undefined) {
        this._burstSortInternal(node[c], arr, collectorString + c);
      }
    }

    // Upper Case and its lower case
    for (let i = 0; i < 26; i++) {
      c = String.fromCharCode(i + "A".charCodeAt(0));
      if (node[c] !== undefined) {
        this._burstSortInternal(node[c], arr, collectorString + c);
      }
      c = String.fromCharCode(i + "a".charCodeAt(0));
      if (node[c] !== undefined) {
        this._burstSortInternal(node[c], arr, collectorString + c);
      }
    }
  }
}

module.exports = Trie;
