/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
  let n = stones.length
  let adj = []
  for (let s of stones) {
    adj.push([])
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let [a, b] = stones[i]
      let [r, c] = stones[j]
      if (a === r || b === c) {
        adj[i].push(j)
        adj[j].push(i)
      }
    }
  }
  let visited = Array(n).fill(0)
  let numComponents = 0
  const dfs = s => {
    visited[s] = true
    for (let j of adj[s]) {
      if (visited[j]) { continue }
      dfs(j)
    }
  }
  for (let i = 0; i < n; i++) {
    if (visited[i]) { continue }
    dfs(i)
    numComponents++
  }
  return n - numComponents
};

const tests = [
  { args: [[[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]]], out: 5 },
  { args: [[[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]]], out: 3 },
  { args: [[[0, 0]]], out: 0 },
];

tests.forEach((t, i) => {
  let res = removeStones(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});