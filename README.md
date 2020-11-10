# string-dsa [![Build Status](https://travis-ci.com/thsubaku9/string-dsa.svg?branch=main)](https://travis-ci.com/thsubaku9/string-dsa) [![Coverage Status](https://coveralls.io/repos/github/thsubaku9/string-dsa/badge.svg?branch=main)](https://coveralls.io/github/thsubaku9/string-dsa?branch=main) ![npm](https://img.shields.io/npm/dt/string-dsa?color=fddb3a) ![npm](https://img.shields.io/badge/Niche-Yep!-ff69b4)
> String oriented Data Structures and Algorithms library for JavaScript

## Installation

```sh
$ npm install string-dsa
```

## DSA

List of supported Data Structures and Algorithms are :

- [Bloom Filter](https://github.com/thsubaku9/string-dsa/blob/main/src/BloomFilter.js)
- [Bracket Balance](https://github.com/thsubaku9/string-dsa/blob/main/src/bracketBalance.js)
- [Custom Sort](https://github.com/thsubaku9/string-dsa/blob/main/src/stringSort.js)
- [Dice Coefficient](https://github.com/thsubaku9/string-dsa/blob/main/src/dice_coeff.js)
- [Edit/Levenshtein Distance](https://github.com/thsubaku9/string-dsa/blob/main/src/edit_distance.js)
- [Knuth Morris Pratt](https://github.com/thsubaku9/string-dsa/blob/main/src/search/kmp.js)
- [Longest Common Substring](https://github.com/thsubaku9/string-dsa/blob/main/src/lcs.js)
- [Rabin Karp](https://github.com/thsubaku9/string-dsa/blob/main/src/search/rabin_karp.js)
- [Trie](https://github.com/thsubaku9/string-dsa/blob/main/src/Trie.js)
## Utilization

To utilize in Node.Js:

```sh
const stringDSA = require('string-dsa');
```

To utilize in Vanilla Js:

```sh
# follow cloning steps
$ npm run prod
$ cp ./dist/string-dsa.js /YOUR/DIRECTORY/FILENAME.js
```

```html
<script src="/YOUR/DIRECTORY/FILENAME.js"></script>
```
## Development Steps

Cloning:

```sh
$ git clone https://github.com/thsubaku9/string-dsa/
$ cd string-dsa
$ npm install
```

Testing:

```sh
$ npm test
```

Coverage:

```sh
$ npm run coverage
```


## License

[ISC](https://github.com/thsubaku9/string-dsa/blob/main/LICENSE)
