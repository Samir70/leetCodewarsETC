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
 * @param {number} distance
 * @return {number}
 * https://leetcode.com/problems/number-of-good-leaf-nodes-pairs/
 */
// slow, but passes.
var countPairs = function (root, distance) {
  root.path = ""
  let stack = [root], leaves = []
  while (stack.length) {
    cur = stack.pop()
    if (cur.left !== null) {
      cur.left.path = cur.path + "L"
      stack.push(cur.left)
    }
    if (cur.right !== null) {
      cur.right.path = cur.path + "R"
      stack.push(cur.right)
    }
    if (cur.left === null && cur.right === null) {
      leaves.push(cur.path)
    }
  }
  // console.log(leaves.length)
  const dist = (p1, p2) => {
    let i = 0;
    while (p1[i] === p2[i]) { i++ }
    return p1.length + p2.length - 2 * i
  }
  let count = 0
  for (let i = 0; i < leaves.length; i++) {
    for (let j = i + 1; j < leaves.length; j++) {
      let d = dist(leaves[i], leaves[j])
      if (d <= distance) { count++ }
    }
  }
  return count
};