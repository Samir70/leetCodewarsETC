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
 * @return {number[]}
 */
// var largestValues = function (root) {
//   let stack = [[root, 0]];
//   let out = [];
//   while (stack.length > 0) {
//       let [cur, level] = stack.pop()
//       if (cur === null) { continue }
//       while (out[level] === undefined) { out.push(-Infinity) }
//       out[level] = Math.max(out[level], cur.val)
//       stack.push([cur.left, level + 1])
//       stack.push([cur.right, level + 1])
//   }
//   return out
// };
var largestValues = function (root) {
  if (root === null) { return [] }
  let stack = [root];
  let out = [];
  while (stack.length > 0) {
    out.push(Math.max(...stack.map(tn => tn.val)))
    let newStack = [];
    while (stack.length > 0) {
      let cur = stack.pop()
      if (cur.left !== null) { newStack.push(cur.left) }
      if (cur.right !== null) { newStack.push(cur.right) }
    }
    stack = [...newStack]
  }
  return out
};