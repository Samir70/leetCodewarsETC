const { ListNode, listify, unlist } = require("../Lists/listify")
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
var insertGreatestCommonDivisors = function (head) {
  let [left, right] = [head, head.next]
  while (right) {
    let hcf = gcd(left.val, right.val)
    // console.log({ pair: [left.val, right.val], hcf })
    left.next = new ListNode(hcf, right)
    left = right
    right = right.next
  }
  return head
};
const gcd = (a, b) => {
  if (b === 0 || a === b) { return a }
  if (a === 0) { return b }
  return a > b ? gcd(a % b, b) : gcd(a, b % a)
}

const tests = [
  { args: [listify([18, 6, 10, 3])], out: [18, 6, 6, 2, 10, 1, 3] },
  { args: [listify([7])], out: [7] },
];

tests.forEach((t, i) => {
  let res = insertGreatestCommonDivisors(...t.args);
  if (unlist(res).join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', unlist(res)
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});