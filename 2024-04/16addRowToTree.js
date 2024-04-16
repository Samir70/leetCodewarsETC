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
 * @param {number} v
 * @param {number} d
 * @return {TreeNode}
 */
var addOneRow = function (root, v, d) {
  if (d === 1) {
    return new TreeNode(v, root, null)
  }
  let stack = [root]
  let depth = 1
  while (stack.length) {
    let newStack = []
    while (stack.length) {
      let cur = stack.pop()
      if (depth === d - 1) {
        let newLeft = new TreeNode(v, cur.left, null)
        let newRight = new TreeNode(v, null, cur.right)
        cur.left = newLeft
        cur.right = newRight
      } else {
        if (cur.left) { newStack.push(cur.left) }
        if (cur.right) { newStack.push(cur.right) }
      }
    }
    stack = [...newStack]
    depth++
  }
  return root
};