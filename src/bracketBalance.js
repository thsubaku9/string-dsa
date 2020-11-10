/**
 *
 * @param {String} searchSpace text where balancing needs to be checked
 * @returns {boolean} states whether text is balanced or not
 */
function isBalanced(searchSpace) {
  if (searchSpace.length == 0) return false;

  const bracketStack = [];
  for (let i = 0; i < searchSpace.length; i++) {
    if (searchSpace[i] == '(' || searchSpace[i] == '[' || searchSpace[i] == '{') {
      bracketStack.push(searchSpace[i]);
    } else if (searchSpace[i] == ')' || searchSpace[i] == ']' || searchSpace[i] == '}') {
      if (bracketStack.length == 0) {
        return false;
      }
      const top = bracketStack.pop();
      if ((top == '(' && searchSpace[i] == ')') || (top == '[' && searchSpace[i] == ']') || (top == '{' && searchSpace[i] == '}')) {
        continue;
      } else {
        return false;
      }
    }
  }
  return (bracketStack.length == 0);
}

module.exports = isBalanced;
