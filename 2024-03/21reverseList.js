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
const reverseList = listHead => {
  let prev = null, cur = listHead;
  while (cur) {
      let nxt = cur.next;
      cur.next = prev;
      prev = cur;
      cur = nxt
  }
  return prev
}