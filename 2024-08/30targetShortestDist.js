class Heap {
  // minHeap by default, use -ve for maxHeap
  constructor() {
    this.size = 0;
    this.arr = [null];
  }

  peek() { return this.size > 0 ? this.arr[1] : null }

  bubbleUp(child) {
    if (child > 1) {
      var parent = Math.floor(child / 2);
      if (this.arr[child] < this.arr[parent]) {
        var temp = this.arr[child];
        this.arr[child] = this.arr[parent];
        this.arr[parent] = temp
        this.bubbleUp(parent)
      }
    }
  }

  add(n) {
    this.size++
    this.arr[this.size] = n
    this.bubbleUp(this.size)
  }

  bubbleDown(parent) {
    var child = [this.arr[parent], parent];
    var le = 2 * parent, r = 2 * parent + 1;
    var left = le > this.size ? Infinity : this.arr[le]
    if (left < child[0]) { child = [left, le] }
    var right = r > this.size ? Infinity : this.arr[r];
    if (right < child[0]) { child = [right, r] }
    if (child[1] > parent) {
      var temp = this.arr[parent];
      this.arr[parent] = child[0];
      this.arr[child[1]] = temp;
      this.bubbleDown(child[1])
    }
  }

  poll() {
    var out = this.arr[1];
    this.arr[1] = this.arr[this.size];
    this.arr.pop()
    this.size--
    this.bubbleDown(1);
    return out;
  }
}
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
    let nodesWithGivenCost = { 0: [a] }
    let pq = new Heap()
    pq.add(0)
    if (minCost[a] === undefined) { minCost[a] = {} }
    let visited = new Set()
    while (pq.size) {
      let dist = pq.poll()
      if (dist > target) { return dist }
      if (nodesWithGivenCost[dist] === undefined) { continue }
      if (nodesWithGivenCost[dist].length === 0) { continue }
      let cur = nodesWithGivenCost[dist].pop()
      if (visited.has(cur)) { continue }
      minCost[a][cur] = Math.min(dist, getMinCost(a, cur))
      visited.add(cur)
      if (Number(cur) === b) { return dist }
      // console.log({a, dist, cur, minDis:minCost[a][cur]})
      for (let neighbour in graph[cur]) {
        if (visited.has(neighbour)) { continue }
        // console.log({a, dist, cur, neighbour})
        let newDist = dist + graph[cur][neighbour]
        pq.add(newDist)
        if (nodesWithGivenCost[newDist] === undefined) { nodesWithGivenCost[newDist] = [] }
        nodesWithGivenCost[newDist].push(neighbour)
      }
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
    // console.log({ i, dist, target })
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
  // if (i !== 2) { return }
  let res = modifiedGraphEdges(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});