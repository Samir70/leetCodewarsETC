/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var sumOfDistancesInTree = function (n, edges) {
  if (n === 1) { return [0] }
  let tree = {}
  for (let [a, b] of edges) {
    if (tree[a] === undefined) { tree[a] = new Set() }
    if (tree[b] === undefined) { tree[b] = new Set() }
    tree[a].add(b)
    tree[b].add(a)
  }
  let count = Array(n).fill(1)
  let res = Array(n).fill(0)
  // console.log(tree)

  const dfs = (root, prev) => {
    for (let i of tree[root]) {
      if (i !== prev) {
        dfs(i, root)
        count[root] += count[i]
        res[root] += res[i] + count[i]
      }
    }
  }
  const dfs2 = (root, prev) => {
    for (let i of tree[root]) {
      if (i !== prev) {
        res[i] = res[root] - count[i] + n - count[i]
        dfs2(i, root)
      }
    }
  }
  dfs(0, 0)
  dfs2(0, 0)
  return res
};

const tests = [
  { args: [6, [[0, 1], [0, 2], [2, 3], [2, 4], [2, 5]]], out: [8, 12, 6, 10, 10, 10] },
  { args: [1, []], out: [0] },
  { args: [2, [[1, 0]]], out: [1, 1] },
];

tests.forEach((t, i) => {
  let res = sumOfDistancesInTree(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});