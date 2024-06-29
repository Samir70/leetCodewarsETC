/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var getAncestors = function (n, edges) {
  let adj = {}
  let ancestorList = Array(n)
  for (let i = 0; i < n; i++) {
    ancestorList[i] = new Set()
    adj[i] = []
  }
  for (let [a, b] of edges) {
    adj[b].push(a)
  }
  let visited = new Set()
  const dfs = v => {
    if (visited.has(v)) { return }
    for (let a of adj[v]) {
      ancestorList[v].add(a)
      if (!visited.has(a)) { dfs(a) }
      for (let oa of ancestorList[a]) {
        ancestorList[v].add(oa)
      }
    }
    // console.log({ v, anc: ancestorList[v] })
    visited.add(v)
  }
  for (let v = 0; v < n; v++) {
    dfs(v)
  }
  // console.log({ adj, ancestorList })
  return ancestorList.map(s => [...s].sort((a, b) => a - b))
};

const tests = [
  { args: [8, [[0, 3], [0, 4], [1, 3], [2, 4], [2, 7], [3, 5], [3, 6], [3, 7], [4, 6]]], out: [[], [], [], [0, 1], [0, 2], [0, 1, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3]] },
  { args: [5, [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]], out: [[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3]] },
  { args: [6, [[0, 3], [5, 0], [2, 3], [4, 3], [5, 3], [1, 3], [2, 5], [0, 1], [4, 5], [4, 2], [4, 0], [2, 1], [5, 1]]], out: [[2, 4, 5], [0, 2, 4, 5], [4], [0, 1, 2, 4, 5], [], [2, 4]] },
]

tests.forEach((t, i) => {
  let res = getAncestors(...t.args);
  if (res.map(a => a.join(",")).join("--") !== t.out.map(a => a.join(",")).join("--")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});