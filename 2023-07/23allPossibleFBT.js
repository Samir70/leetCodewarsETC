/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
let memo = {}
var allPossibleFBT = function (n) {
  let zeroNode = new TreeNode(0)
  if (n === 1) { return [new TreeNode(0)] }
  if (n === 3) { return [new TreeNode(0, zeroNode, zeroNode)] }
  if (memo[n] !== undefined) { return memo[n] }
  let out = []
  for (let left = 1; left < n; left += 2) {
    let right = n - 1 - left
    let posLeftTree = allPossibleFBT(left)
    let posRightTree = allPossibleFBT(right)
    for (let leftRoot of posLeftTree) {
      for (let rightRoot of posRightTree) {
        let root = new TreeNode(0)
        root.left = leftRoot
        root.right = rightRoot
        out.push(root)
      }
    }
  }
  memo[n] = out
  return memo[n]
};