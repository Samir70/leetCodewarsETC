/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  // find target, setting parent property along the way
  let stack = [root], targetFound = false;
  let targetNode;
  while (!targetFound && stack.length > 0) {
    let cur = stack.pop()
    if (cur.left) {
      cur.left.parent = cur
      stack.push(cur.left)
    }
    if (cur.right) {
      cur.right.parent = cur
      stack.push(cur.right)
    }
    if (cur === target) {
      targetFound = true,
        targetNode = cur
      // console.log("found target", targetNode)
    }
  }
  targetNode.dist = 0;
  stack = [targetNode]
  let ans = [];
  let visited = new Set()
  while (stack.length > 0) {
    let cur = stack.pop()
    if (visited.has(cur.val)) { continue }
    visited.add(cur.val)
    if (cur.dist === k) { ans.push(cur.val) }
    if (cur.parent) { cur.parent.dist = cur.dist + 1; stack.push(cur.parent) }
    if (cur.left) { cur.left.dist = cur.dist + 1; stack.push(cur.left) }
    if (cur.right) { cur.right.dist = cur.dist + 1; stack.push(cur.right) }
  }
  return ans
};

const tests = [
  { args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 2,], out: [1, 7, 4] },
  { args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 3,], out: [0, 8] },
  { args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4,], out: [] },
  { args: [[1], 1, 3,], out: [] },
];

tests.forEach((t, i) => {
  let res = distanceK(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});