/**
 * @param {string} source
 * @param {string} target
 * @param {character[]} original
 * @param {character[]} changed
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function (source, target, original, changed, cost) {
  let graph = {}
  for (let i = 0; i < original.length; i++) {
    let [a, b, c] = [original[i], changed[i], cost[i]]
    if (graph[a] === undefined) { graph[a] = {} }
    let prev = graph[a][b] || Infinity
    graph[a][b] = Math.min(c, prev)
  }
  let minCost = {}
  const getMinCost = (a, b) => {
    if (a === b) { return 0 }
    if (minCost[a] === undefined) {
      minCost[a] = {}
    }
    return minCost[a][b] === undefined ? Infinity : minCost[a][b]
  }
  const dijkstra = (a, b) => {
    if (getMinCost(a, b) !== Infinity) { return getMinCost(a, b) }
    let stack = [[0, a]]
    if (minCost[a] === undefined) { minCost[a] = {} }
    let visited = new Set()
    while (stack.length) {
      let [dist, cur] = stack.pop()
      if (visited.has(cur)) { continue }
      minCost[a][cur] = Math.min(dist, getMinCost(a, cur))
      // console.log({ a, cur, dist: getMinCost(a, cur) })
      if (cur === b) { return dist }
      visited.add(cur)
      for (let neighbour in graph[cur]) {
        if (visited.has(neighbour)) { continue }
        stack.push([dist + graph[cur][neighbour], neighbour])
      }
      stack.sort((a, b) => b[0] - a[0])
    }
    return getMinCost(a, b)
  }
  // console.log(graph)
  const helper = i => {
    if (i >= source.length) { return 0 }
    let [a, b] = [source[i], target[i]]
    if (a === b) { return helper(i + 1) }
    if (getMinCost(a, b) === Infinity) { dijkstra(a, b) }
    return getMinCost(a, b) === Infinity ? Infinity : getMinCost(a, b) + helper(i + 1)
  }
  let ans = helper(0)
  return ans === Infinity ? -1 : ans
};

const tests = [
  { args: ["abcd", "acbe", ["a", "b", "c", "c", "e", "d"], ["b", "c", "b", "e", "b", "e"], [2, 5, 5, 1, 2, 20]], out: 28 },
  { args: ["aaaa", "bbbb", ["a", "c"], ["c", "b"], [1, 2]], out: 12 },
  { args: ["abcd", "abce", ["a"], ["e"], [10000]], out: -1 },
];

tests.forEach((t, i) => {
  let res = minimumCost(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});