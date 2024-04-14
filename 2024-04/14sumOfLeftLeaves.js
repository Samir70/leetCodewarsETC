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
 * @return {number}
 */
var sumOfLeftLeaves = function (root) {
  let stack = [root]
  let sum = 0
  while (stack.length) {
    let cur = stack.pop()
    if (cur === null) { continue }
    if (cur.left) {
      if (cur.left.left === null && cur.left.right === null) {
        sum += cur.left.val
      } else {
        stack.push(cur.left)
      }
    }
    stack.push(cur.right)
  }
  return sum
};

const tests = [
  { args: [[3, 9, 20, null, null, 15, 7]], out: 24 },
  { args: [[1]], out: 0 },
  { args: [[1, 2, 3, 4, 5]], out: 4 },
];

tests.forEach((t, i) => {
  let res = sumOfLeftLeaves(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});