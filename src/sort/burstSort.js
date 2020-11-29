const Trie = require("../Trie");

/**
 *
 * @param {String[]} keywords the keywords that you wish to sort
 */
function burstSort(keywords) {
  let internalTrie = new Trie();
  internalTrie.insertList(keywords);
  let result = internalTrie.burstSort();
  return result;
}

module.exports = burstSort;
