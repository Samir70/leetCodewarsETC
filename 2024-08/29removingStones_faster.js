/**
 * @param {number[][]} stones
 * @return {number}
 */
class UnionFind {
  constructor(parent) {
    this.parent = Array(parent).fill(-1)
    this.componentCount = 0
    this.uniqueNodes = new Set()
  }
  find(node) {
    if (!this.uniqueNodes.has(node)) {
      this.componentCount++
      this.uniqueNodes.add(node)
    }
    if (this.parent[node] === -1) {
      this.parent[node] = node
    } else if (this.parent[node] !== node) {
      this.parent[node] = this.find(this.parent[node])
    }
    return this.parent[node]
  }
  union(n1, n2) {
    let [root1, root2] = [this.find(n1), this.find(n2)]
    if (root1 === root2) { return }
    this.parent[root1] = this.parent[root2]
    this.componentCount--
  }
}
var removeStones = function (stones) {
  let n = stones.length
  let uf = new UnionFind(20002)
  for (let [r, c] of stones) {
    uf.union(r, c + 10001)
  }
  return n - uf.componentCount
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