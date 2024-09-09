const { listify } = require("../Lists/listify")
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number} m
 * @param {number} n
 * @param {ListNode} head
 * @return {number[][]}
 */
var spiralMatrix = function (m, n, head) {
  let out = []
  for (let r = 0; r < m; r++) {
    out.push(Array(n).fill(-1))
  }
  let dirs = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ]
  let d = 0
  let cur = head, loc = [0, 0]
  const move = (a, b) => [a[0] + b[0], a[1] + b[1]]
  while (cur) {
    let [r, c] = loc
    // console.log({ d, r, c, loc, v: cur.val })
    out[r][c] = cur.val
    cur = cur.next
    let newLoc = move(loc, dirs[d])
    if (
      newLoc[0] < 0 || newLoc[0] === m ||
      newLoc[1] < 0 || newLoc[1] === n ||
      out[newLoc[0]][newLoc[1]] !== -1) {
      d++
      d %= 4
      newLoc = move(loc, dirs[d])
    }
    loc = [...newLoc]
  }
  return out
};

const tests = [
  { args: [3, 5, listify([3, 0, 2, 6, 8, 1, 7, 9, 4, 2, 5, 5, 0])], out: [[3, 0, 2, 6, 8], [5, 0, -1, -1, 1], [5, 2, 4, 9, 7]] },
  { args: [1, 4, listify([0, 1, 2])], out: [[0, 1, 2, -1]] },
];

tests.forEach((t, i) => {
  let res = spiralMatrix(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});