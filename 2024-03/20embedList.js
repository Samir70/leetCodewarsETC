/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {number} a
 * @param {number} b
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeInBetween = function (list1, a, b, list2) {
  let cur = list1, i = 1
  while (i < a) {
    cur = cur.next
    // console.log({i, v: cur.val})
    i++
  }
  let newMid = cur
  while (i <= b) {
    cur = cur.next
    // console.log({i, v: cur.val})
    i++
  }
  let newTail = cur.next
  cur = list2
  newMid.next = list2
  while (cur.next) {
    cur = cur.next
  }
  cur.next = newTail
  return list1
};

// https://leetcode.com/problems/merge-in-between-linked-lists/description/