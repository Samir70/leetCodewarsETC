var removeNodes = function (head) {
  let stack = [head]
  let cur = head.next
  const peek = () => stack.length ? stack[stack.length - 1].val : Infinity
  while (cur) {
    if (cur.val > peek()) {
      let last = stack.pop()
      last.val = cur.val
      last.next = cur.next
      cur = last
    } else {
      stack.push(cur)
      cur = cur.next
    }
  }
  return stack[0]
};

const tests = [
  { args: [[5, 2, 13, 3, 8]], out: [13, 8] },
  { args: [[1, 1, 1, 1]], out: [1, 1, 1, 1] },
  { args: [[1]], out: [1] },
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