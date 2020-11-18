"use strict";

// AC is being implemented as a transition: map<state: int, map<edge: char, state: int>> for lesser restrictions and failure: array[state] and output: array[state]
class AC {
  /**
     *
     * @param {String[]} keywordList the list of keywords that you wish to use for searching
     * @param {Number} maxStates the number of states that are allowed (maxStates >= total number of letters in keywordlist). Set as -1 to allow the algorithm to figure out by itself
     */
  constructor(keywordList, maxStates = -1) {
    this.totalStates = maxStates > 0 ? maxStates : (keywordList.reduce((letterCount, str) => letterCount + str.length, 0) + 1);
    this.keyWords = new Array(...keywordList);
    this.states = 0;
    // this.stateTransitions = new Map<Number,Map<String,Number>>();    -- for typescript
    this.stateTransitions = new Map();

    this.stateTransitions.set(0, new Map());

    this.failureTransition = new Array(this.totalStates);

    this.stateOutput = new Array(this.totalStates);

    for (let i = 0; i < this.totalStates; i++) {
      this.stateOutput[i] = 0;
    }

    // Inital insert
    for (let i = 0; i < this.keyWords.length; i++) {
      this._initialInsert(this.keyWords[i], i);
    }

    // preprocessing for failure and outputs
    this._exploreBFS();
  }

  _exploreBFS() {
    let buffer = [];
    // preprocess states for failure on 0 level

    this.failureTransition[0] = 0;
    for (let x of this.stateTransitions.get(0).keys()) {
      if (x != undefined) {
        this.failureTransition[this.stateTransitions.get(0).get(x)] = 0;
        buffer.push(this.stateTransitions.get(0).get(x));
      }
    }

    while (buffer.length) {
      let currentState = buffer.pop();

      for (let x of this.stateTransitions.get(currentState).keys()) {
        if (x == undefined) continue;

        let failureState = this.failureTransition[currentState];
        while (this.stateTransitions.get(failureState).get(x) == undefined && failureState != 0) {
          failureState = this.failureTransition[failureState];
        }
        if (this.stateTransitions.get(failureState).get(x) != undefined) failureState = this.stateTransitions.get(failureState).get(x);

        this.failureTransition[this.stateTransitions.get(currentState).get(x)] = failureState;
        this.stateOutput[this.stateTransitions.get(currentState).get(x)] |= this.stateOutput[failureState];

        buffer.push(this.stateTransitions.get(currentState).get(x));
      }
    }
  }

  _setOutput(currentStateNumber, keywordIndex) {
    this.stateOutput[currentStateNumber] |= (1 << keywordIndex);
  }

  _initialInsert(keyword, keywordIndex) {
    let currentState = this.stateTransitions.get(0);
    let transitionToState;

    for (let i = 0, c = keyword.charAt(i); i < keyword.length; i++, c = keyword.charAt(i)) {
      if (currentState.get(c) == undefined) {
        this.states++;
        currentState.set(c, this.states);
      }

      transitionToState = currentState.get(c);
      if (this.stateTransitions.get(transitionToState) == undefined) {
        this.stateTransitions.set(transitionToState, new Map());
      }
      currentState = this.stateTransitions.get(transitionToState);
    }
    this._setOutput(transitionToState, keywordIndex);
  }

  /**
   *
   * @param {String} searchSpace the text to be searched over
   *
   * @returns {Array[]} where each index gives a start position and end position of the term
   */
  find(searchSpace) {
    // while searching, if base state is 0 then send the state back to zero if character state transition does not exist
    let currentState = 0;
    let resultLocation = [];
    for (let i = 0, c = searchSpace[i]; i < searchSpace.length; i++, c = searchSpace[i]) {
      while (this.stateTransitions.get(currentState).get(c) == undefined && currentState != 0) {
        currentState = this.failureTransition[currentState];
      }

      if (this.stateTransitions.get(currentState).get(c) != undefined) {
        currentState = this.stateTransitions.get(currentState).get(c);
      }

      if (this.stateOutput[currentState] != 0) {
        // store output to resultLocation

        for (let myOutputs = this.stateOutput[currentState], index = 0; myOutputs > 0; myOutputs >>= 1, index++) {
          if (myOutputs & 0x01) {
            let locationPair = [];
            locationPair.push(i - (this.keyWords[index].length - 1));
            locationPair.push(i);
            resultLocation.push(locationPair);
          }
        }
      }
    }

    return resultLocation;
  }
}

module.exports = AC;
