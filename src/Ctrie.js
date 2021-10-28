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
  /** Instantiate your Ctrie */
  constructor() {
    this._rootNode = new Node();
  }

  /**
     *
     * @param {String} term search term to be inserted into the trie
     */
  insert(term) {
    // tracking variables
    let cNode = this._rootNode;

    for (let pos = 0; pos < term.length; pos++) {
      let char = term[pos];
      if (cNode.edgeValue.get(char)) { // find common prefix and then branch accordingly
        let edgeString = cNode.edgeValue.get(char);
        // find prefix
        let _prefix = this._findPrefix(edgeString, term.substring(pos));
        // get prefix-suffix
        let ePrefix = edgeString.substring(0, _prefix);
        let eSuffix = edgeString.substring(_prefix);
        // update cNode and pos
        if (ePrefix == edgeString) {
          // just go to the next node
          cNode = cNode.nextNode.get(char);
        } else { // case where ePrefix < len(edgeString)
          cNode.edgeValue.set(char, ePrefix);
          let _cascadeNode = cNode.nextNode.get(char);
          let _newNode = new Node();
          _newNode.nextNode.set(eSuffix[0], _cascadeNode);
          _newNode.edgeValue.set(eSuffix[0], eSuffix);
          cNode.nextNode.set(char, _newNode);
          cNode = _newNode;
        }

        pos += _prefix - 1;
      } else { // insert the substring into this entry
        cNode.edgeValue.set(char, term.substring(pos));
        cNode.nextNode.set(char, new Node(true));
        break;
      }
    }
  }

  _findPrefix(t1, t2) {
    for (let i = 0; i < t1.length && i < t2.length; i++) {
      if (t1[i] != t2[i]) return i;
    }

    return t1.length > t2.length ? t2.length : t1.length;
  }

  _findChildren(currentNode) {
    return currentNode.nextNode.size + currentNode.$;
  }

  /**
     *
     * @param {String} term search term to be inserted into the trie
     */
  remove(term) {
    let cNode = this._rootNode;
    this._remove(term, cNode, 0);
  }

  _remove(term, currentNode, offset) {
    /*
      1. Check if given prefix exists in the node
      2. If yes then continue to nextNode
      3. Repeat 1-2 until term end is reached
      4. If current node has a next node to terminal and that is the only node, then it is safe to delete current node
      5. Propagate result back to previous recur. call
    */

    if (offset < term.length) {
      let edgeValue = currentNode.edgeValue.get(term[offset]);
      if (edgeValue == undefined) return false;

      let _prefix = this._findPrefix(edgeValue, term.substring(offset));
      if (_prefix.length < edgeValue.length) return false;

      let recursionValid = this._remove(term, currentNode.nextNode.get(term[offset]), offset + _prefix);
      if (recursionValid) {
        currentNode.nextNode.delete(term[offset]);
        currentNode.edgeValue.delete(term[offset]);
        return this._findChildren(currentNode) == 0;
      }
    } else if (offset == term.length) {
      currentNode.$ = false;
      return this._findChildren(currentNode) == 0;
    }
    return false;
  }

  /**
     *
     * @param {String} term search term to be inserted into the trie
     */
  find(searchSpace) {
    const returnArray = [];
    for (let i = 0; i < searchSpace.length; i++) {
      let j = i;
      let cNode = this._rootNode;
      // compare from current location with the cTrie
      while (j < searchSpace.length && cNode) {
        let edgeString = cNode.edgeValue.get(searchSpace[j]);
        if (edgeString == undefined) break;

        let k;
        for (k = 0; k < edgeString.length && j + k < searchSpace.length && edgeString[k] == searchSpace[j + k]; k++);

        if (k < edgeString.length) break;

        cNode = cNode.nextNode.get(edgeString[0]);
        j += k;
        if (cNode != undefined && cNode.$) returnArray.push([i, j - 1]);
      }
    }
    return returnArray;
  }

  /**
     *
     * @param {String} term search term to be looked up in the structure
     *
     * @returns {Boolean}
     */
  contains(term) {
    let cNode = this._rootNode;

    // for each iteration check whether prefix match happens or not. update pos accordingly
    for (let pos = 0; pos < term.length; pos++) {
      let char = term[pos];
      let edgeString = cNode.edgeValue.get(char);

      if (edgeString == undefined) return false;

      let prefix = this._findPrefix(edgeString, term.substring(pos));
      if (prefix < edgeString.length) return false;
      pos += prefix - 1;
      cNode = cNode.nextNode.get(char);
    }

    return cNode.$;
  }
}

module.exports = Ctrie;
