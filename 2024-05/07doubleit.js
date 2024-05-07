function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var doubleIt = function (head) {
  if (head.val > 4) {
    head = new ListNode(0, head)
  }
  let cur = head
  while (cur) {
    cur.val = (2 * cur.val) % 10
    if (cur.next && cur.next.val > 4) {
      cur.val++
    }
    cur = cur.next
  }
  return head
};

const tests = [
  { args: [[1, 8, 9]], out: [3, 7, 8] },
  { args: [[9, 9, 9]], out: [1, 9, 9, 8] },
  { args: [[1, 0, 8, 9, 8, 7, 6, 5, 4, 5, 6, 7, 7, 8, 9, 0, 0, 8, 7, 6, 5, 4, 0, 0, 0]], out: [2, 1, 7, 9, 7, 5, 3, 0, 9, 1, 3, 5, 5, 7, 8, 0, 1, 7, 5, 3, 0, 8, 0, 0, 0] }
];

const { listify, unlist } = require("../Lists/listify")

tests.forEach((t, i) => {
  let res = unlist(doubleIt(...t.args.map(listify)));
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});