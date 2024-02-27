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
var diameterOfBinaryTree = function (root) {
  let maxDiam = 0
  const depth = (n) => {
    if (n === null) { return 0 }
    let depthL = depth(n.left)
    let depthR = depth(n.right)
    let diamN = depthL + depthR
    maxDiam = Math.max(maxDiam, diamN)
    // console.log({val: n.val, depthL, depthR, diamN, maxDiam})
    return 1 + Math.max(depthL, depthR)
  }
  depth(root)
  return maxDiam
};