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
var nextLargerNodes = function (head) {
  let stack = [], out = []
  let cur = head
  while (cur) {
    while (stack.length && stack[stack.length - 1].val < cur.val) {
      let { val, idx } = stack.pop()
      out[idx] = cur.val
    }
    cur.idx = out.length;
    out.push(0)
    stack.push(cur)
    cur = cur.next
  }
  return out
};

const { listify } = require('../Lists/listify')

const tests = [
  { args: [listify([2, 1, 5])], out: [5, 5, 0] },
  { args: [listify([2, 7, 4, 3, 5])], out: [7, 0, 5, 5, 0] },
  { args: [listify([5, 4, 3, 7, 7, 2, 1, 8])], out: [7, 7, 7, 8, 8, 8, 8, 0] },
]

tests.forEach((t, i) => {
  let res = nextLargerNodes(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});