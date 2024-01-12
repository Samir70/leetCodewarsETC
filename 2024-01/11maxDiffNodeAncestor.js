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
var maxAncestorDiff = function(root) {
  let maxDiff = 0
  const helper = (node, min, max) => {
      maxDiff = Math.max(maxDiff, Math.abs(node.val - min), Math.abs(node.val - max))
      let newMin = Math.min(min, node.val)
      let newMax = Math.max(max, node.val)
      if (node.left) {
          helper(node.left, newMin, newMax)
      }
      if (node.right) {
          helper(node.right, newMin, newMax)
      }
  }
  helper(root, root.val, root.val)
  return maxDiff
};