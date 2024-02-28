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
var findBottomLeftValue = function (root) {
  let queue = [root]
  let out = null
  // traverse tree layer by layer
  while (queue.length > 0) {
    let newqueue = []
    console.log(queue.map(n => n.val))
    out = queue[0].val
    let i = 0
    while (i < queue.length) {
      let cur = queue[i++]
      if (cur.left) { newqueue.push(cur.left) }
      if (cur.right) { newqueue.push(cur.right) }
    }
    queue = [...newqueue]
  }
  return out
};


/**
 * Much faster:
 */

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
var findBottomLeftValue = function (root) {
  let out = null, maxDepth = -1
  const dfs = (node, depth) => {
    if (node === null) { return }
    if (depth > maxDepth) {
      maxDepth = depth
      out = node.val
    }
    dfs(node.left, depth + 1)
    dfs(node.right, depth + 1)
  }
  dfs(root, 0)
  return out
};