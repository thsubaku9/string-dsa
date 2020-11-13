"use strict";

class AC {
  /**
     *
     * @param {String[]} keywordList the list of keywords that you wish to use for searching
     * @param {Number} maxStates the number of states that are allowed (maxStates >= total number of letters in keywordlist). Set as -1 to allow the algorithm to figure out by itself
     */
  constructor(keywordList, maxStates = -1) {
    this.totalStates = maxStates > 0 ? maxStates : keywordList.reduce((letterCount, str) => letterCount + str.length, 0);
  }

  find(searchSpace) {
    return searchSpace;
  }
}

module.exports = AC;
