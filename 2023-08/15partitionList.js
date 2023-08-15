/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  if (head === null) { return head }
  let leftHead = new ListNode('left'), leftPointer = leftHead;
  let rightHead = new ListNode('right'), rightPointer = rightHead;
  let cur = head;
  while (cur !== null) {
    if (cur.val < x) {
      leftPointer.next = cur;
      leftPointer = leftPointer.next;
    } else {
      rightPointer.next = cur;
      rightPointer = rightPointer.next;
    }
    cur = cur.next;
  }
  leftPointer.next = rightHead.next;
  rightPointer.next = null;
  return leftHead.next
};