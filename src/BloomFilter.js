/** Class implementation of Bloom Filter */
class BF {
  /**
     *
     * @param {Number} buckets The number of buckets for the hash function
     * @param {Number} splits The number of splits you wish to have
     * @param {Function[]} customHashFn custom hashing function
     *
     * @returns {BF} the demanded Bloom Filter
     */
  constructor(buckets, splits, customHashFn = null) {
    this._bucketSize = buckets;
    this._splitSize = splits;
    this.bucket = new Array();
    this._useInternalHashFn = true;
    this._customHashFn = undefined;
    this._insertionCount = 0;

    for (let x = 0; x < this._splitSize; x++) {
      const internalArray = new Array(this._bucketSize);
      for (let y = 0; y < this._bucketSize; y++) internalArray[y] = false;
      this.bucket.push(internalArray);
    }

    if (customHashFn != null && customHashFn.length == splits) {
      this._useInternalHashFn = false;
      this._customHashFn = customHashFn;
    } else {
      this._customHashFn = [];
      for (let i = 1; i < splits + 1; i++) {
        this._customHashFn.push(((i) => (x) => {
          let hash_value = 0;
          for (let j = 0; j < x.length; j++) {
            hash_value *= i;
            hash_value += x.charCodeAt(j);
            hash_value %= this._bucketSize;
          }
          return hash_value;
        })(i));
      }
    }
  }

  get bucketSize() {
    return this._bucketSize;
  }

  get splitSize() {
    return this._splitSize;
  }

  /**
     *
     * @param {Object} elem Object that you wish to insert into the Bloom Filter (Should possess toString Property !!)
     */
  insert(elem) {
    try {
      const elem_string = elem.toString();

      for (let i = 0; i < this._splitSize; i++) {
        this.bucket[i][this._customHashFn[i](elem_string)] = true;
      }
      this._insertionCount++;
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  }

  /**
     *
     * @param {Object} elem  Object that you wish to search for existence
     */
  exists(elem) {
    try {
      const elem_string = elem.toString();
      let doesExist = true;
      for (let i = 0; i < this._splitSize; i++) {
        doesExist &= this.bucket[i][this._customHashFn[i](elem_string)];
      }
      return doesExist;
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      return null;
    }
  }

  get FalsePositiveRate() {
    let internal_iter;
    const collision_prob = 1 / this._bucketSize;
    const non_collision = 1 - collision_prob;
    let non_collision_splits = 1; let non_collision_all = 1;
    let fpr = 1;
    for (internal_iter = 0; internal_iter < this._splitSize; internal_iter++) non_collision_splits *= non_collision;
    for (internal_iter = 0; internal_iter < this._insertionCount; internal_iter++) non_collision_all *= non_collision_splits;
    for (internal_iter = 0; internal_iter < this._splitSize; internal_iter++) fpr *= 1 - non_collision_all;

    return fpr;
  }
}

module.exports = BF;
