/**
 * Initialize your data structure here.
 */
var MyHashMap = function () {
  this.badHash = Array(10 ** 6 + 1).fill(false)
};

/**
 * value will always be non-negative. 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
  this.badHash[key] = value
  return null
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
  return this.badHash[key] === false ? -1 : this.badHash[key]
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
  this.badHash[key] = false
  return null
};

/** 
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */

const tests = [
  {
    commands: ["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"],
    args: [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]],
    out: [null, null, null, 1, -1, null, 1, null, -1]
  }
];

tests.forEach(t => {
  badHash = new MyHashMap()
  for (let i = 1; i < t.commands.length; i++) {
    let res = badHash[t.commands[i]](...t.args[i])
    console.log(`badhash.${t.commands[i]}(${t.args[i].join(", ")}) = ${res} ........ ${res === t.out[i] ? "correct" : "should be " + t.out[i]}`)
  }
})

