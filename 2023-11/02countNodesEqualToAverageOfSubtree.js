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
var averageOfSubtree = function (root) {
  const treeSum = r => {
    if (r.sum !== undefined) { return { sum: r.sum, nodecount: r.nodecount } }
    let sum = r.val, nodecount = 1;
    sum += r.left === null ? 0 : treeSum(r.left).sum
    sum += r.right === null ? 0 : treeSum(r.right).sum
    nodecount += r.left === null ? 0 : treeSum(r.left).nodecount
    nodecount += r.right === null ? 0 : treeSum(r.right).nodecount
    r.sum = sum;
    r.nodecount = nodecount
    return { sum, nodecount }
  }
  let count = 0;
  let stack = [root];
  while (stack.length > 0) {
    let cur = stack.pop()
    if (cur === null) { continue }
    let stats = treeSum(cur)
    if (Math.floor(stats.sum / stats.nodecount) === cur.val) {
      count++
    }
    stack.push(node.left)
    stack.push(node.right)
  }
  return count
};