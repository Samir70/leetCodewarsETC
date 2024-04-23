/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  if (n === 1) { return [0] }
  let possAnwers = n
  let neighbours = {}
  for (let [a, b] of edges) {
    if (neighbours[a] === undefined) { neighbours[a] = new Set() }
    if (neighbours[b] === undefined) { neighbours[b] = new Set() }
    neighbours[a].add(b)
    neighbours[b].add(a)
  }
  let ends = new Set(); // vertices with one edge left
  for (let v = 0; v < n; v++) {
    if (neighbours[v].size === 1) { ends.add(v) }
  }
  // console.log(ends)
  while (possAnwers > 2) {
    let stack = [...ends]
    for (let v of stack) {
      for (let nextToV of [...neighbours[v]]) {
        neighbours[nextToV].delete(v)
        if (neighbours[nextToV].size === 1) { ends.add(nextToV) }
      }
      ends.delete(v)
      possAnwers--
    }
  }
  return [...ends]
};

const tests = [
  { args: [4, [[1, 0], [1, 2], [1, 3]]], out: [1] },
  { args: [1, []], out: [0] },
  { args: [3, [[0, 1], [0, 2]]], out: [0] },
  { args: [6, [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]], out: [3, 4] },
];

tests.forEach((t, i) => {
  let res = findMinHeightTrees(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});