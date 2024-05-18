/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * https://leetcode.com/problems/distribute-coins-in-binary-tree/
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var distributeCoins = function (root) {
  let moves = 0
  const dfs = (cur) => {
    if (cur === null) { return 0 }
    let leftCoins = dfs(cur.left)
    let rightCoins = dfs(cur.right)
    moves += Math.abs(leftCoins) + Math.abs(rightCoins)
    return cur.val - 1 + leftCoins + rightCoins
  }
  dfs(root)
  return moves
};