/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function (graph) {
  let safeNodes = [], stack = []
  let edges = {}
  for (let i = 0; i < graph.length; i++) {
    if (graph[i].length === 0) { stack.push(i) }
    for (let dest of graph[i]) {
      if (edges[dest] === undefined) { edges[dest] = { in: new Set(), out: new Set() } }
      if (edges[i] === undefined) { edges[i] = { in: new Set(), out: new Set() } }
      edges[i].out.add(dest)
      edges[dest].in.add(i)
    }
  }
  // console.log(edges, { stack })
  while (stack.length > 0) {
    let cur = stack.pop()
    safeNodes.push(cur)
    if (edges[cur] === undefined) { continue }
    for (let origin of [...edges[cur].in]) {
      // console.log({origin, cur, edges: [...edges[cur].in]})
      edges[origin].out.delete(cur)
      if (edges[origin].out.size === 0) {stack.push(origin)}
    }
  }
  return safeNodes.sort((a, b) => a - b)
};

const tests = [
  { args: [[[1, 2], [2, 3], [5], [0], [5], [], []]], out: [2, 4, 5, 6] },
  { args: [[[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]], out: [4] },
];

tests.forEach((t, i) => {
  let res = eventualSafeNodes(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});