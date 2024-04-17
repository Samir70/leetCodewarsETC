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
 * @return {string}
 */
const letter = n => "abcdefghijklmnopqrstuvwxyz"[n]
var smallestFromLeaf = function (root) {
  let stack = [[root, letter(root.val)]]
  let words = []
  while (stack.length) {
    let [cur, word] = stack.pop()
    if (cur.left === null && cur.right === null) {
      words.push([...word].reverse().join(""))
    } else {
      if (cur.left) {
        stack.push([cur.left, word + letter(cur.left.val)])
      }
      if (cur.right) {
        stack.push([cur.right, word + letter(cur.right.val)])
      }
    }
  }
  // console.log(words.sort())
  // console.log(["abc", "ab"].sort())
  return words.sort()[0]
};