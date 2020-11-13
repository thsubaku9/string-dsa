function min(a, b) {
  return a < b ? a : b;
}
/** Finds the Edit distance between two strings
 *
 * @param {String} string1 the first string
 * @param {String} string2 the second string
 *
 * @returns {Number} states the edit distance between two strings
 */
function editDistance(string1, string2) {
  const editDistanceMatrix = new Array();

  for (let i = 0; i < string1.length + 1; i++) {
    editDistanceMatrix.push(new Array(string2.length + 1));
  }

  for (let i = 0; i < string2.length + 1; i++) {
    editDistanceMatrix[0][i] = i;
  }

  for (let i = 0; i < string1.length + 1; i++) {
    editDistanceMatrix[i][0] = i;
  }

  for (let i = 1; i < string1.length + 1; i++) {
    for (let j = 1; j < string2.length + 1; j++) {
      if (string1.charAt(i - 1) === string2.charAt(j - 1)) {
        editDistanceMatrix[i][j] = editDistanceMatrix[i - 1][j - 1];
      } else {
        editDistanceMatrix[i][j] = min(min(editDistanceMatrix[i - 1][j - 1], editDistanceMatrix[i][j - 1]), min(editDistanceMatrix[i][j - 1], editDistanceMatrix[i - 1][j])) + 1;
      }
    }
  }

  return editDistanceMatrix[string1.length][string2.length];
}

module.exports = editDistance;
