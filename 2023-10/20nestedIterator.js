/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function (nestedList) {
  const flatten = arr => {
    let out = []
    for (let a of arr) {
      if (Number.isInteger(a)) {
        out.push(a)
      } else {
        out = out.concat(flatten(a))
      }
    }
    return out
  }
  // for leetcode's iterator version:
  // const flatten = nList => {
  //   let out = []
  //   let stack = nList
  //   while (stack.length > 0) {
  //     let cur = stack.shift();
  //     if (cur.isInteger()) {
  //       out.push(cur.getInteger())
  //     } else {
  //       out = out.concat(flatten(cur.getList()))
  //     }
  //   }
  //   return out
  // }
  this.numberList = flatten(nestedList)
  this.pointer = 0
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function () {
  return this.pointer < this.numberList.length
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function () {
  return this.numberList[this.pointer++]
};

const tests = [
  { args: [[[1, 1], 2, [1, 1]]], out: [1, 1, 2, 1, 1] },
  { args: [[1, [4, [6]]]], out: [1, 4, 6] },
];

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/
tests.forEach((t, i) => {
  let ni = new NestedIterator(...t.args);
  let res = [];
  while (ni.hasNext()) { res.push(ni.next()) }
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
