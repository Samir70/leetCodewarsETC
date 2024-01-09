/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */

const getLeaves = r => {
  if (r === null) { return [] }
  if (r.left === null && r.right === null) {
    return [r.val]
  }
  return [...getLeaves(r.left), ...getLeaves(r.right)]
}
var leafSimilar = function (root1, root2) {
  const leaves1 = getLeaves(root1);
  const leaves2 = getLeaves(root2);
  // console.log({leaves1, leaves2})
  return leaves1.join(",") === leaves2.join(",")
};