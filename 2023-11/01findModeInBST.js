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
 * @return {number[]}
 */
var findMode = function(root) {
  let tally = {}
  let stack = [root];
  let maxFreq = 1, modes = [];
  while (stack.length > 0) {
      let cur = stack.pop()
      if (cur === null) {continue}
      let v = cur.val;
      tally[v] = (tally[v] || 0) + 1
      if (tally[v] === maxFreq) {
          modes.push(v)
      }
      if (tally[v] > maxFreq) {
          maxFreq = tally[v];
          modes = [v]
      }
      stack.push(cur.left)
      stack.push(cur.right)
  }
  console.log(tally)
  return modes
};