/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (p === null) { return q === null }
  if (q === null) { return false }
  var stackA = [p], stackB = [q];
  while (stackA.length > 0) {
    var cA = stackA.pop(), cB = stackB.pop();
    if (cA.val !== cB.val) { return false }
    if (cA.right !== null) {
      if (cB.right === null) { return false }
      stackA.push(cA.right);
      stackB.push(cB.right);
    } else {
      if (cB.right !== null) { return false }
    }
    if (cA.left !== null) {
      if (cB.left === null) { return false }
      stackA.push(cA.left);
      stackB.push(cB.left);
    } else {
      if (cB.left !== null) { return false }
    }
  }
  return true
};