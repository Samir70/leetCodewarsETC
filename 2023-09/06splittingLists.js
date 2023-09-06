/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function (head, k) {
  let count = 0, cur = head;
  while (cur) {
    count++;
    cur = cur.next
  }
  let size = Math.floor(count / k)
  let sizes = Array(k).fill(size), sum = size * k;
  for (let i = 0; i < k; i++) {
    if (sum < count) { sizes[i]++; sum++ }
  }
  // console.log({count, sizes})
  cur = head;
  let output = [], i = 0, part = 0;
  for (let size of sizes) {
    if (size === 0) { output.push(null); continue }
    output.push(cur)
    for (let j = 0; j < size - 1; j++) {
      cur = cur.next
    }
    let nextStarter = cur.next
    cur.next = null
    cur = nextStarter
  }
  return output
};