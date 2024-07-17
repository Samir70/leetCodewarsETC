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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 * https://leetcode.com/problems/delete-nodes-and-return-forest/
 */
var delNodes = function (root, toDelete) {
  let out = [], stack = [root]
  let delSet = new Set(toDelete)
  if (!delSet.has(root.val)) { out.push(root) }
  while (stack.length) {
    let cur = stack.pop()
    if (!cur) { continue }
    if (delSet.has(cur.val)) {
      if (cur.left && !delSet.has(cur.left.val)) {
        out.push(cur.left)
      }
      if (cur.right && !delSet.has(cur.right.val)) {
        out.push(cur.right)
      }
    }
    stack.push(cur.left)
    stack.push(cur.right)
    if (cur.left && delSet.has(cur.left.val)) { cur.left = null }
    if (cur.right && delSet.has(cur.right.val)) { cur.right = null }
  }
  return out
};