/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
// var hasCycle = function(head) {
//   if (head === null) {return false}
//   if (head.next === null) {return false}
//   let fast = head.next;
//   let slow = head;
//   while (fast !== null) {
//       slow = slow.next;
//       fast = fast.next;
//       if (fast !== null) {fast = fast.next}
//       if (fast === slow) {return true}
//   } 
//   return false
// };

// faster, don't know why:
var hasCycle = function (head) {
  let fast = head;
  let slow = head;

  while (fast != null && fast.next != null) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast === slow) {
      return true;
    }
  }
  return false;

};