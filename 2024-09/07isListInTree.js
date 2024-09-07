/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 * https://leetcode.com/problems/linked-list-in-binary-tree/
 */
var isSubPath = function (head, root) {
  let stack = [[head, root]]
  while (stack.length) {
    let [curList, curTree] = stack.pop()
    if (curList === null) { return true }
    if (curTree !== null) {
      if (curList.val === curTree.val) {
        stack.push([curList.next, curTree.left])
        stack.push([curList.next, curTree.right])
      }
    }
  }
  let foundInLeft = root.left ? isSubPath(head, root.left) : false
  if (foundInLeft) { return true }
  let foundInRight = root.right ? isSubPath(head, root.right) : false
  return foundInRight
};