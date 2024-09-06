const { ListNode, listify, unlist } = require('../Lists/listify')

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function (nums, head) {
  let numSet = new Set(nums)
  let dummy = new ListNode(null, head)
  let prev = dummy, cur = head
  while (cur) {
    if (numSet.has(cur.val)) {
      prev.next = cur.next
    } else {
      prev = prev.next
    }
    cur = cur.next
  }
  return dummy.next
};

const tests = [
  { args: [[1, 2, 3], listify([1, 2, 3, 4, 5])], out: listify([4, 5]) },
  { args: [[1], listify([1, 2, 1, 2, 1, 2])], out: listify([2, 2, 2]) },
  { args: [[5], listify([1, 2, 3, 4])], out: listify([1, 2, 3, 4]) },
];

tests.forEach((t, i) => {
  let res = modifiedList(...t.args);
  if (JSON.stringify(res) !== JSON.stringify(t.out)) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});