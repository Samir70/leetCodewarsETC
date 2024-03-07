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
var middleNode = function (head) {
  var dummy = new ListNode('whatever', head)
  var fast = dummy, slow = dummy;
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
    if (fast !== null) { fast = fast.next }
  }
  return slow
};