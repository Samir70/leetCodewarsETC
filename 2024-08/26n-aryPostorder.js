/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children; // array
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[]}
 */
var postorder = function (root) {
  if (root === null) { return [] }
  if (root.children.length === 0) { return [root.val] }
  let out = []
  for (let child of root.children) {
      out = [...out, ...postorder(child)]
  }
  out.push(root.val)
  return out
};