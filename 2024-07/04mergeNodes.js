/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var mergeNodes = function (head) {
  let cur = head, tail = head.next
  while (cur.next) {
    cur = cur.next
    while (cur && cur.next && cur.next.val > 0) {
      cur.val += cur.next.val
      tail = cur
      cur.next = cur.next.next
    }
  }
  tail.next = null
  return head.next
};