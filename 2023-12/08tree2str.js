/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} t
 * @return {string}
 */
var tree2str = function(t) {
  if (t === null) {return null}
  let rootVal = t.val
  let left = tree2str(t.left) || "()"
  let right = tree2str(t.right) || ""
  if (left !== "()") {left = `(${left})`}
  if (left === "()" && right === "") {left = ""}
  if (right !== "") {right = `(${right})`}
  let rest = left + right

  return rest === "" ? `${rootVal}` : `${rootVal}${rest}`
};