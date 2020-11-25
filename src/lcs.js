function max(a, b) {
  return a > b ? a : b;
}

/**
 *
 * @param {String} string1 the first string to be used in LCS search
 * @param {String} string2 the second string to be used in LCS search
 *
 * @return {Number} the largest common substring size
 */
function lcs(string1, string2) {
  if (!(string1.length & string1.length)) {
    return 0;
  }
  const matchMatrix = Array();
  for (let i = 0; i <= string1.length; i++) {
    const emptyArray = Array();
    for (let j = 0; j <= string2.length; j++) {
      emptyArray.push(0);
    }

    matchMatrix.push(emptyArray);
  }

  for (let i1 = 0; i1 <= string1.length; i1++) {
    matchMatrix[i1][0] = 0;
  }

  for (let i2 = 0; i2 <= string2.length; i2++) {
    matchMatrix[0][i2] = 0;
  }

  for (let i1 = 1; i1 <= string1.length; i1++) {
    for (let i2 = 1; i2 <= string2.length; i2++) {
      if (string1[i1 - 1] == string2[i2 - 1]) {
        matchMatrix[i1][i2] = matchMatrix[i1 - 1][i2 - 1] + 1;
      } else {
        matchMatrix[i1][i2] = max(max(matchMatrix[i1][i2 - 1], matchMatrix[i1 - 1][i2]), matchMatrix[i1 - 1][i2 - 1]);
      }
    }
  }
  return matchMatrix[string1.length][string2.length];
}

module.exports = lcs;
