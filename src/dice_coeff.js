function nGram(str, n) {
  const gramSplit = new Map(); // gram <-> count
  let currentGram = '';
  for (let startpos = 0; startpos < str.length; startpos += 1) {
    currentGram += str[startpos];

    if (startpos >= n - 1) {
      if (gramSplit.has(currentGram)) {
        gramSplit.set(currentGram, gramSplit.get(currentGram) + 1);
      } else {
        gramSplit.set(currentGram, 1);
      }
      currentGram = currentGram.substr(1);
    }
  }
  return gramSplit;
}

function min(a, b) {
  return a > b ? b : a;
}

/**
 * Returns the computed Dice Coefficient for the given n-gram of the two strings
 * @param {String} st1 First string
 * @param {String} st2 Second String
 * @param {Number} n n-mer
 * @return {Number} a number between 0 and 1
 */
function computeDice(st1, st2, n) {
  if (st1.length < 1 || st2.length < 1 || n > min(st1.length, st2.length)) return -1;

  const mapSt1 = nGram(st1, n);
  const mapSt2 = nGram(st2, n);

  let sharedValueCount = 0;

  for (const x of mapSt1.keys()) {
    if (mapSt2.has(x)) {
      sharedValueCount += min(mapSt1.get(x), mapSt2.get(x));
    }
  }

  let st1ValueCount = 0; let st2ValueCount = 0;

  for (const x of mapSt1.keys()) {
    st1ValueCount += mapSt1.get(x);
  }

  for (const x of mapSt2.keys()) {
    st2ValueCount += mapSt2.get(x);
  }

  const score = (2 * sharedValueCount) / (st1ValueCount + st2ValueCount);

  return score;
}

module.exports = computeDice;
