/**
 * @param {number} k
 * @param {number[][]} rowConditions
 * @param {number[][]} colConditions
 * @return {number[][]}
 */
var buildMatrix = function (k, rowConditions, colConditions) {
  let rowOrder = topOrder(k, rowConditions)
  let colOrder = topOrder(k, colConditions)
  // console.log({ rowOrder, colOrder })
  if (!rowOrder || !colOrder) { return [] }
  let out = []
  let pos = {}
  for (let i = 0; i < k; i++) {
    out.push(Array(k).fill(0))
    if (pos[rowOrder[i]] === undefined) { pos[rowOrder[i]] = {} }
    if (pos[colOrder[i]] === undefined) { pos[colOrder[i]] = {} }
    pos[rowOrder[i]].r = i
    pos[colOrder[i]].c = i
  }
  // console.log({ rowOrder, colOrder, pos })
  for (let n = 1; n <= k; n++) {
    let { r, c } = pos[n]
    out[r][c] = n
  }
  return out
};
const topOrder = (v, edges) => {
  // if (edges.length < 2) { return true }
  var noIns = new Set([...Array(v)].map((x, i) => x = i + 1))
  var inOutCount = {}
  for (var e of edges) {
    if (inOutCount[e[0]] === undefined) {
      inOutCount[e[0]] = { in: new Set(), out: new Set() }
    }
    if (inOutCount[e[1]] === undefined) {
      inOutCount[e[1]] = { in: new Set(), out: new Set() }
    }
    inOutCount[e[0]].out.add(e[1])
    inOutCount[e[1]].in.add(e[0])
    noIns.delete(e[1])
  }
  var stack = Array.from(noIns);
  var edgeCount = edges.length;
  var order = [];
  // console.log(inOutCount, stack);
  while (stack.length > 0) {
    var vert = stack.pop();
    order.push(vert);
    if (inOutCount[vert] !== undefined) {
      for (var dest of inOutCount[vert].out) {
        inOutCount[dest].in.delete(vert)
        if (inOutCount[dest].in.size === 0) { stack.push(dest) }
        edgeCount--
      }
    }
  }
  // console.log(order)
  return order.length < v ? false : order
}

const tests = [
  { args: [3, [[1, 2], [3, 2]], [[2, 1], [3, 2]]], out: [[3, 0, 0], [0, 0, 1], [0, 2, 0]] },
  { args: [4, [[1, 2], [3, 2]], [[2, 1], [3, 2]]], out: [[4, 0, 0, 0], [0, 3, 0, 0], [0, 0, 0, 1], [0, 0, 2, 0]] },
  { args: [3, [[1, 2], [2, 3], [3, 1], [2, 3]], [[2, 1]]], out: [] },
  {
    args: [8,
      [[1, 2], [7, 3], [4, 3], [5, 8], [7, 8], [8, 2], [5, 8], [3, 2], [1, 3], [7, 6], [4, 3], [7, 4], [4, 8], [7, 3], [7, 5]],
      [[5, 7], [2, 7], [4, 3], [6, 7], [4, 3], [2, 3], [6, 2]]],
    // out: [
    //   [0, 0, 0, 0, 0, 0, 7, 0],
    //   [0, 6, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 5, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 4, 0, 0, 0, 0],
    //   [8, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 1],
    //   [0, 0, 0, 0, 0, 3, 0, 0],
    //   [0, 0, 0, 0, 2, 0, 0, 0]
    // ]
    out: [
      [0, 0, 0, 0, 7, 0, 0, 0],
      [0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 4, 0, 0],
      [8, 0, 0, 0, 0, 0, 0, 0],
      [0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 3, 0],
      [0, 0, 2, 0, 0, 0, 0, 0]
    ]
  },
  {
    args: [8, [[1, 3]],
      [[5, 4], [3, 4], [8, 4], [6, 7], [2, 6], [3, 7], [6, 8], [6, 4], [2, 6], [5, 6], [2, 1], [5, 7], [8, 3]]],
    out: [[0, 0, 0, 0, 8, 0, 0, 0], [0, 0, 0, 0, 0, 0, 7, 0], [0, 0, 0, 6, 0, 0, 0, 0], [5, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 4], [0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0]]
  },
];

tests.forEach((t, i) => {
  // if (i !== 4) { return }
  let res = buildMatrix(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});