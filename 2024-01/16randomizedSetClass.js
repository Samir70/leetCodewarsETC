/**
 * Initialize your data structure here.
 */
var RandomizedSet = function () {
  this.directory = {};
  this.contents = [];
  this.size = 0;
};

/**
* Inserts a value to the set. Returns true if the set did not already contain the specified element. 
* @param {number} val
* @return {boolean}
*/
RandomizedSet.prototype.insert = function (val) {
  if (this.directory[val] === undefined) {
    this.contents.push(val);
    this.directory[val] = this.size;
    this.size++
    return true
  } else {
    return false
  }
};

/**
* Removes a value from the set. Returns true if the set contained the specified element. 
* @param {number} val
* @return {boolean}
*/
RandomizedSet.prototype.remove = function (val) {
  if (this.directory[val] === undefined) {
    return false
  }
  var ind = this.directory[val];
  var valAtEnd = this.contents[this.size - 1]
  this.contents[ind] = valAtEnd
  this.directory[valAtEnd] = ind
  delete this.directory[val]
  this.contents.pop();
  this.size--
  return true
};

/**
* Get a random element from the set.
* @return {number}
*/
RandomizedSet.prototype.getRandom = function () {
  var rndIndex = Math.floor(Math.random() * this.size);
  return this.contents[rndIndex]
};

/** 
* Your RandomizedSet object will be instantiated and called as such:
* var obj = new RandomizedSet()
* var param_1 = obj.insert(val)
* var param_2 = obj.remove(val)
* var param_3 = obj.getRandom()
*/