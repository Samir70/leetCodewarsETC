/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.map = new Map();
  this.capacity = capacity;
  return null
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;
  const val = this.map.get(key);
  this.map.delete(key);
  this.map.set(key, val);
  return val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  this.map.delete(key);
  this.map.set(key, value);
  if (this.map.size > this.capacity) {
    const firstItem = this.map.keys().next().value;
    this.map.delete(firstItem);
  }
  return null
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// const commands = ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// const args = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]];
// const outs = [null, null, null, 1, null, -1, null, -1, 3, 4]

// const commands = ["LRUCache", "put", "get", "put", "get", "get"]
// const args = [[1], [2, 1], [2], [3, 2], [2], [3]]
// const outs = [null, null, 1, null, -1, 2]

const commands = ["LRUCache", "get", "put", "get", "put", "put", "get", "get"]
const args = [[2], [2], [2, 6], [1], [1, 5], [1, 2], [1], [2]]
const outs = [null, -1, null, -1, null, null, 2, 6]

let lru = new LRUCache(args[0][0])
commands.forEach((cmd, i) => {
  if (i === 0) { return }
  let res = lru[cmd](...args[i]);
  if (res !== outs[i]) {
    console.log(
      'test', i, `${cmd}(${args[i].join(", ")})`, 'should be', outs[i], ' got ', res
    )
  } else {
    console.log('test', i, `${cmd}(${args[i].join(", ")})`, 'was correct!')
  }
});