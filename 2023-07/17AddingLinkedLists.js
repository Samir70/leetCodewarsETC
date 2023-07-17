/**
 * Definition for singly-linked list.
 * }
*/
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var addTwoNumbersLeastSigFirst = function (a, b) {
  let sum = new ListNode();
  let cur = sum;
  let carry = 0;
  while (a || b || carry === 1) {
    let v = a === null ? 0 : a.val;
    let w = b === null ? 0 : b.val;
    let total = v + w + carry;
    carry = total > 9 ? 1 : 0;
    let s = new ListNode(total % 10, null)
    cur.next = s;
    cur = cur.next;
    a = a === null ? a : a.next;
    b = b === null ? b : b.next;
  }
  return sum.next
};
const reverse = listHead => {
  let prev = null, cur = listHead;
  while (cur) {
      let nxt = cur.next;
      cur.next = prev;
      prev = cur;
      cur = nxt
  }
  return prev
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (a, b) {
  a = reverse(a);
  b = reverse(b);
  return reverse(addTwoNumbersLeastSigFirst(a, b))
};

const { listify, unlist } = require('../Lists/listify');

const tests = [
  { args: [[7, 2, 4, 3], [5, 6, 4]], out: [7, 8, 0, 7] },
  { args: [[2, 4, 3], [5, 6, 4]], out: [8, 0, 7] },
  { args: [[0], [0]], out: [0] },
];

tests.forEach((t, i) => {
  let res = unlist(addTwoNumbers(...t.args.map(listify)));
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});

