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
var readTree = root => {
  if (root === null) { return [] }
  var values = []
  var stack = [{ v: root.val, node: root }]
  while (stack.length > 0) {
    var current = stack.pop();
    if (current.node.left !== null) {
      stack.push({ v: current.v * 10 + current.node.left.val, node: current.node.left })
    }
    if (current.node.right !== null) {
      stack.push({ v: current.v * 10 + current.node.right.val, node: current.node.right })
    }
    if (current.node.left === null && current.node.right === null) {
      values.push(current.v)
    }
  }
  // console.log(values)
  return values
}

var sumNumbers = function (root) {
  return readTree(root).reduce((a, b) => a + b, 0)
};