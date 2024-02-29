/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
*/
/**
 * @param {TreeNode} root
 * @return {boolean}
*/
const isIncOdd = arr => {
  if (arr[0] % 2 === 0) { return false }
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] % 2 === 0) { return false }
    if (arr[i] <= arr[i - 1]) { return false }
  }
  return true
}
const isDecEven = arr => {
  if (arr[0] % 2 === 1) { return false }
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] % 2 === 1) { return false }
    if (arr[i] >= arr[i - 1]) { return false }
  }
  return true
}
var isEvenOddTree = function (root) {
  let queue = [root]
  let level = 0
  while (queue.length > 0) {
    let newQ = []
    let curLevel = []
    for (let cur of queue) {
      curLevel.push(cur.val)
      if (cur.left) { newQ.push(cur.left) }
      if (cur.right) { newQ.push(cur.right) }
    }
    console.log({ level, curLevel })
    if (level % 2 && !isDecEven(curLevel)) { return false }
    if (level % 2 === 0 && !isIncOdd(curLevel)) { return false }
    queue = [...newQ]
  }
  return true
};

const tests = [
  { args: [[1, 10, 4, 3, null, 7, 9, 12, 8, 6, null, null, 2]], out: true },
  { args: [[5, 4, 2, 3, 3, 7]], out: true },
  { args: [[5, 9, 1, 3, 5, 7]], out: true },
  { args: [[15, 26, 1, 1, 5, 43, 47, 26, 24, 20, null, 18, 16, 12, 8, null, null, null, null, null, null, null, null, null, null, 21]], out: true },
];

