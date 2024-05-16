/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * https://leetcode.com/problems/evaluate-boolean-binary-tree/
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var evaluateTree = function(root) {
  if (root.val < 2) {return root.val === 1}
  let left = root.left < 2 ? root.left : evaluateTree(root.left)
  let right = root.right < 2 ? root.right : evaluateTree(root.right)
  return root.val === 2 ? left || right : left && right
};