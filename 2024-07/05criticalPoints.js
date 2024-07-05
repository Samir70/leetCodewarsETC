/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function (head) {
  let idxLastCritical = null, idxFirstCritical = null
  let idx = 1
  let prev = head, cur = head.next
  let [minDist, maxDist] = [Infinity, -Infinity]
  while (cur) {
    if (cur.next === null) {
      cur = cur.next
      continue
    }
    let isLocalMin = cur.val < prev.val && cur.val < cur.next.val
    let isLocalMax = cur.val > prev.val && cur.val > cur.next.val
    // console.log({idx, val: cur.val, isLocalMin, isLocalMax, idxLastCritical})
    if (isLocalMin || isLocalMax) {
      if (idxLastCritical) {
        let dist = idx - idxLastCritical
        // console.log({ dist, idx, idxLastCritical, val: cur.val })
        minDist = Math.min(minDist, dist)
        maxDist = Math.max(maxDist, idx - idxFirstCritical)
      } else {
        idxFirstCritical = idx
      }
      idxLastCritical = idx
    }
    cur = cur.next
    prev = prev.next
    idx++
  }
  return minDist === Infinity ? [-1, -1] : [minDist, maxDist]
};