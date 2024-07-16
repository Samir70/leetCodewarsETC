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
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function (root, startValue, destValue) {
  let [sRoute, dRoute] = [null, null]
  root.path = ""
  let stack = [root]
  while (stack.length) {
    cur = stack.pop()
    if (cur.val === startValue) { sRoute = cur.path }
    if (cur.val === destValue) { dRoute = cur.path }
    if (sRoute !== null && dRoute !== null) { break }
    if (cur.left !== null) {
      cur.left.path = cur.path + "L"
      stack.push(cur.left)
    }
    if (cur.right !== null) {
      cur.right.path = cur.path + "R"
      stack.push(cur.right)
    }
  }
  let i = 0
  while (sRoute[i] === dRoute[i]) { i++ }
  sRoute = sRoute.slice(i)
  dRoute = dRoute.slice(i)
  // console.log(sRoute, dRoute)
  return Array(sRoute.length).fill("U").join("") + dRoute
};

const tests = [
  { args: [[5, 1, 2, 3, null, 6, 4], 3, 6], out: "UURL" },
  { args: [[5, 1, 2, 3, null, 6, 4], 4, 6], out: "UL" },
  { args: [[2, 1], 2, 1], out: "L" },
];

tests.forEach((t, i) => {
  let res = getDirections(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});