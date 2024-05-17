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
 * @param {number} target
 * @return {TreeNode}
 */
var removeLeafNodes = function (root, target) {
  if (root.left === null && root.right === null) {
    return root.val === target ? null : root
  }
  root.left = root.left === null ? null : removeLeafNodes(root.left, target)
  root.right = root.right === null ? null : removeLeafNodes(root.right, target)
  if (root.left === null && root.right === null) {
    return root.val === target ? null : root
  }
  return root
};