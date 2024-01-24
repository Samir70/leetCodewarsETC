/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

const isPseudoPal = arr => arr.filter(val => val % 2 === 1).length <= 1 ? 1 : 0
/**
 * @param {TreeNode} root
 * @return {number}
 */
var pseudoPalindromicPaths = function (root) {
  root.tally = Array(10).fill(0)
  let stack = [root]
  let count = 0
  while (stack.length) {
    let cur = stack.pop()
    cur.tally[cur.val]++
    // console.log({cur: cur.val, t: cur.tally})
    if (cur.left === null && cur.right === null) {
      count += isPseudoPal(cur.tally)
      // console.log("found leaf:", {val: cur.val, tally: cur.tally, isPP: isPseudoPal(cur.tally)})
    } else {
      if (cur.left) {
        cur.left.tally = [...cur.tally]
        stack.push(cur.left)
      }
      if (cur.right) {
        cur.right.tally = [...cur.tally]
        stack.push(cur.right)
      }
    }
  }
  return count
};