const { sort } = require("../sort/stringSort");
const Suffix = require("./SuffixMain");

/**
 * Burrows Wheeler Transformation
 *
 * @param {String} text the string that you wish to find BWT of
 *
 * @returns {String} the respective BWT of the string
 */
function transform(text) {
  let mySfx = new Suffix(text);
  let bwt_t = "";

  let res = mySfx.suffixArray();

  for (let i = 0; i < res.length; i++) {
    bwt_t += mySfx.originalString[(res[i] + res.length - 1) % res.length];
  }

  return bwt_t;
}

/**
 * inverse Burrows Wheeler Transformation
 *
 * @param {String} bwt_t the BWT representation of the string
 *
 * @returns {String} the original string
 */
function inverse_transform(bwt_t) {
  let index_sort = sort(bwt_t.split(""), true);
  let inverse_index_pos = new Array(bwt_t.length);
  for (let i = 0; i < bwt_t.length; i++) inverse_index_pos[index_sort[i]] = i;

  let start_pos = index_sort[0]; let end_pos = 0;
  let text = bwt_t[start_pos];

  while (end_pos != index_sort[0]) {
    text = bwt_t[end_pos] + text;
    start_pos = end_pos;
    end_pos = inverse_index_pos[end_pos];
  }
  return text;
}

module.exports = {
  transform,
  inverse_transform,
};
