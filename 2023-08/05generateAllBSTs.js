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
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}
const memo = {}
let countCalls = 0
var generateTrees = function (n) {
  const makeTrees = arr => {
    let out = []
    if (arr.length === 0) { return [null] }
    if (arr.length === 1) { return [new TreeNode(arr[0])] }
    let key = (arr.join(","));
    countCalls++
    // if (countCalls % 10 === 0) {console.log(countCalls, Object.keys(memo))}
    if (memo[key] !== undefined) {return memo[key]}
    for (let i = 0; i < arr.length; i++) {
      let left = arr.slice(0, i), root = arr[i], right = arr.slice(i + 1)
      // console.log(`from makeTrees(${arr})`, { left, root, right })
      let leftTrees = makeTrees(left)
      let rightTrees = makeTrees(right)
      // console.log(`leftTrees from makeTrees(${arr}) with `, { left, root, right }, JSON.stringify(leftTrees))
      // console.log(`rightTrees from makeTrees(${arr}) with root ${root}`, JSON.stringify(rightTrees))
      for (let i of leftTrees) {
        for (let j of rightTrees) {
          out.push(new TreeNode(root, i, j))
        }
      }
    }
    // console.log(`from makeTrees(${arr})`, { numTreesFound: out.length })
    memo[key] = out
    // console.log(`out from makeTrees(${arr})`, JSON.stringify(out), "\n")
    return out
  }
  let vals = [...Array(n)].map((x, i) => i + 1)
  return makeTrees(vals)
};

console.log(JSON.stringify(generateTrees(3)))