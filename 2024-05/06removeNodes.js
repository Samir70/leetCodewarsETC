const reverseList = listHead => {
  let prev = null, cur = listHead;
  while (cur) {
      let nxt = cur.next;
      cur.next = prev;
      prev = cur;
      cur = nxt
  }
  return prev
}
var removeNodes = function (head) {
  head = reverseList(head)
  let cur = head, max = head.val
  while (cur.next) {
    if (cur.next.val < max) {
      cur.next = cur.next.next
    } else {
      max = cur.next.val
      cur = cur.next
    }
  }
  return reverseList(head)
};

const tests = [
  { args: [[5, 2, 13, 3, 8]], out: [13, 8] },
  { args: [[1, 1, 1, 1]], out: [1, 1, 1, 1] },
];

const { listify, unlist } = require("../Lists/listify")

tests.forEach((t, i) => {
  let res = unlist(removeNodes(...t.args.map(listify)));
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});