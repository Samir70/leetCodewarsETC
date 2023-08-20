/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */

const makeEdge = (a, b) => `${a}->${b}`
var sortItems = function (n, m, group, beforeItems) {
  let noIns = new Set([...Array(n)].map((v, i) => i));
  let insAndOuts = {}, edgeCount = 0;
  // handle all pairs a, b that are ordered a -> b
  for (let b = 0; b < n; b++) {
    for (let a of beforeItems[b]) {
      // console.log(makeEdge(a, b))
      if (insAndOuts[a] === undefined) {
        insAndOuts[a] = { ins: new Set(), outs: new Set() }
      }
      if (insAndOuts[b] === undefined) {
        insAndOuts[b] = { ins: new Set(), outs: new Set() }
      }
      insAndOuts[a].outs.add(b)
      insAndOuts[b].ins.add(a)
      noIns.delete(b)
      edgeCount++
    }
  }
  // console.log({ noIns, edgeCount, insAndOuts })
  let stack = Array.from(noIns);
  let order = [];
  while (stack.length > 0) {
    let vert = stack.pop();
    order.push(vert);
    if (insAndOuts[vert] !== undefined) {
      for (let dest of insAndOuts[vert].outs) {
        insAndOuts[dest].ins.delete(vert)
        if (insAndOuts[dest].ins.size === 0) { stack.push(dest) }
        edgeCount--
      }
    }
  }
  // console.log({ order, edgeCount, order })
  if (edgeCount > 0) { return [] }
  let groupLists = {}, groupOrder = [], groupsSeen = new Set();
  for (let i = n - 1; i >= 0; i--) {
    let val = order[i]
    let g = group[val];
    if (!groupsSeen.has(g)) {
      groupOrder.push(g);
      groupsSeen.add(g)
    }
  }
  for (let val of order) {
    let g = group[val];
    if (groupLists[g] === undefined) { groupLists[g] = [] }
    groupLists[g].push(val)
  }
  groupOrder.reverse()
  // console.log({ groupLists, groupOrder })
  let out = []
  for (let g of groupOrder) {
    out = out.concat(groupLists[g])
  }
  return out
};

const tests = [
  { args: [8, 2, [-1, -1, 1, 0, 0, 1, 0, -1], [[], [6], [5], [6], [3, 6], [], [], []],], out: [6, 3, 4, 5, 2, 7, 1, 0] },
  { args: [8, 2, [-1, -1, 1, 0, 0, 1, 0, -1], [[], [6], [5], [6], [3], [], [4], []],], out: [] },
  { args: [5, 5, [2, 0, -1, 3, 0], [[2, 1, 3], [2, 4], [], [], []]], out: [3, 2, 4, 1, 0] }
];

tests.forEach((t, i) => {
  let res = sortItems(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});