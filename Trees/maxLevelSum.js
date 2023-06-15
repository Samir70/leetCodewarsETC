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
var maxLevelSum = function(root) {
  let levels = {}
  let stack = [[1, root]];
  while (stack.length) {
      let [level, node] = stack.pop()
      if (node) {
          levels[level] = (levels[level] || 0) + node.val;
          stack.push([level + 1, node.left]);
          stack.push([level + 1, node.right]);
      }
  }
  console.log(levels)
  let maxSum = -Infinity;
  let levelToReturn = null;
  for (let level in levels) {
      let sum = levels[level]
      console.log(`level ${level} has sum ${sum}`)
      if (sum > maxSum) {
          maxSum = sum
          levelToReturn = level
      }
  }
  return levelToReturn
};