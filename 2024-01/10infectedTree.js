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
 * @param {number} start
 * @return {number}
 */
var amountOfTime = function (root, start) {
  let stack = [root], count = 0, first = null;
  while (stack.length) {
    let cur = stack.pop()
    count++
    if (cur.val === start) { first = cur }
    if (cur.left) {
      cur.left.parent = cur
      stack.push(cur.left)
    }
    if (cur.right) {
      cur.right.parent = cur
      stack.push(cur.right)
    }
  }
  // console.log({first, count})
  if (count === 1) { return 0 }
  stack = [[first, 0]]
  let seen = new Set()
  seen.add(start)
  let maxTime = 0
  while (stack.length) {
    let [cur, time] = stack.pop()
    // console.log({cur, time})
    if (time > maxTime) { maxTime = time }
    if (cur.left && !seen.has(cur.left.val)) {
      stack.push([cur.left, time + 1])
      seen.add(cur.left.val)
    }
    if (cur.right && !seen.has(cur.right.val)) {
      stack.push([cur.right, time + 1])
      seen.add(cur.right.val)
    }
    if (cur.parent && !seen.has(cur.parent.val)) {
      stack.push([cur.parent, time + 1])
      seen.add(cur.parent.val)
    }
  }
  return maxTime
};