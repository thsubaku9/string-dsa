const kmp = require('./search').kmp
const rabinKarp = require('./search').rabinKarp
const diceCoeff = require('../src/dice_coeff')

module.exports = {
  diceCoeff,
  kmp,  
  rabinKarp
};
