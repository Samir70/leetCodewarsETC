/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function (head) {
  let numStr = ""
  let cur = head
  while (cur) {
    numStr += cur.val
    cur = cur.next
  }
  return parseInt(numStr, 2)
};