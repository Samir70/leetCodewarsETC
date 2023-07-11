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
// var minDepth = function(root) {
// recursion = dfs
//   if (root === null) {return 0}
//   if (root.left === null && root.right === null) {return 1}
//   return 1 + Math.min(minDepth(root.left) || Infinity, minDepth(root.right) || Infinity)
// };

const minDepth = root => {
  // BFS
  if (root === null) { return 0 }
  let stack = [root], depth = 1;
  while (stack.length > 0) {
    let newStack = []
    while (stack.length> 0) {
      let cur = stack.pop()
      if (cur.left === null && cur.right === null) { return depth }
      if (cur.left) {newStack.push(cur.left)}
      if (cur.right) {newStack.push(cur.right)}
    }
    stack = [...newStack]
    depth++
  }
  // shouldn't get here!
  return null
}