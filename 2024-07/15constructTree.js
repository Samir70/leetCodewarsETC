/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function (descriptions) {
  let isChild = new Set()
  let nodeHash = {}
  for (let [p, c, isL] of descriptions) {
    isChild.add(c)
    let par = nodeHash[p] ? nodeHash[p] : new TreeNode(p)
    let child = nodeHash[c] ? nodeHash[c] : new TreeNode(c)
    if (isL) {
      par.left = child
    } else {
      par.right = child
    }
    nodeHash[p] = par
    nodeHash[c] = child
  }
  // console.log(nodeHash, isChild)
  for (let node in nodeHash) {
    node = Number(node)
    // console.log({node, has: isChild.has(node)})
    if (!isChild.has(node)) { return nodeHash[node] }
  }
  return -1
};

const tests = [
  { args: [[[20, 15, 1], [20, 17, 0], [50, 20, 1], [50, 80, 0], [80, 19, 1]]], out: [50, 20, 80, 15, 17, 19] },
  { args: [[[1, 2, 1], [2, 3, 0], [3, 4, 1]]], out: [1, 2, null, null, 3, 4] },
];

