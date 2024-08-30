/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @param {number} target
 * @return {number[][]}
 */
var modifiedGraphEdges = function (n, edges, source, destination, target) {
  const dijkstra = (a, b) => {
    const graph = {}
    for (let [a, b, c] of edges) {
      if (c < 0) { continue }
      if (graph[a] === undefined) { graph[a] = {} }
      if (graph[b] === undefined) { graph[b] = {} }
      graph[a][b] = c
      graph[b][a] = c
    }
    let minCost = {}
    const getMinCost = (a, b) => {
      if (a === b) { return 0 }
      if (minCost[a] === undefined) {
        minCost[a] = {}
      }
      return minCost[a][b] === undefined ? Infinity : minCost[a][b]
    }
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
  let dist = dijkstra(source, destination)
  // console.log({ dist, target })
  if (dist < target) { return [] }
  if (dist === target) {
    for (let j = 0; j < edges.length; j++) {
      if (edges[j][2] > 0) { continue }
      edges[j][2] = 2 * 10 ** 9
    }
    return edges
  }
  for (let i = 0; i < edges.length; i++) {
    let [a, b, c] = edges[i]
    if (c > 0) { continue }
    edges[i][2] = 1
    dist = dijkstra(source, destination)
    // console.log({ i, dist })
    if (dist <= target) {
      edges[i][2] += target - dist
      for (let j = i + 1; j < edges.length; j++) {
        if (edges[j][2] > 0) { continue }
        edges[j][2] = 2 * 10 ** 9
      }
      return edges
    }
  }
  return []
};

const tests = [
  { args: [5, [[4, 1, -1], [2, 0, -1], [0, 3, -1], [4, 3, -1]], 0, 1, 5], out: [[4, 1, 1], [2, 0, 1], [0, 3, 1], [4, 3, 3]] },
  { args: [3, [[0, 1, -1], [0, 2, 5]], 0, 2, 6], out: [] },
  { args: [4, [[1, 0, 4], [1, 2, 3], [2, 3, 5], [0, 3, -1]], 0, 2, 6], out: [[1, 0, 4], [1, 2, 3], [2, 3, 5], [0, 3, 1]] },
  { args: [4, [[1, 0, 4], [1, 2, 3], [2, 3, 5], [0, 3, 4]], 0, 2, 6], out: [] },
  {
    args: [
      7, [[0, 1, -1], [1, 2, -1], [2, 3, 3], [3, 4, 4], [4, 5, 5], [5, 6, 6]], 0, 6, 30
    ], out: [[0, 1, 1], [1, 2, 11], [2, 3, 3], [3, 4, 4], [4, 5, 5], [5, 6, 6]]
  },
  {
    args: [
      4, [[0, 1, 5], [1, 2, 7], [2, 3, 7], [3, 1, 9], [3, 0, -1], [0, 2, -1]], 2, 3, 7
    ], out: [[0, 1, 5], [1, 2, 7], [2, 3, 7], [3, 1, 9], [3, 0, 2000000000], [0, 2, 2000000000]]
  }
];

tests.forEach((t, i) => {
  let res = modifiedGraphEdges(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});