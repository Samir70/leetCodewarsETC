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
*/
var Graph = function (n, edges) {
  this.n = n;
  this.graph = []
  for (let i = 0; i < n; i++) {
    this.graph.push([])
  }
  for (let [a, b, weight] of edges) {
    this.graph[a].push({ dest: b, weight })
    this.graph[b].push({ dest: a, weight })
  }
  // console.log(this.graph)
};

/** 
* @param {number[]} edge
* @return {void}
*/
Graph.prototype.addEdge = function (edge) {
  let [a, b, weight] = edge;
  this.graph[a].push({ dest: b, weight })
};

/** 
* @param {number} node1 
* @param {number} node2
* @return {number}
*/
Graph.prototype.shortestPath = function (node1, maxDist) {
  // using Dijkstra
  let costToReachNode = Array(this.n).fill(Infinity);
  let nodesWithGivenCost = { 0: [node1] }
  costToReachNode[node1] = 0;
  let pq = new Heap()
  pq.add(0)
  while (pq.peek() !== null) {
    let curCost = pq.poll();
    if (curCost > maxDist) { return costToReachNode }
    if (nodesWithGivenCost[curCost] === undefined) { continue }
    if (nodesWithGivenCost[curCost].length === 0) { continue }
    let curNode = nodesWithGivenCost[curCost].pop();
    // console.log({ curNode, curCost, costToReachNode })
    // if (curNode === node2) { return curCost }
    for (let next of this.graph[curNode]) {
      let newCost = curCost + next.weight;
      if (nodesWithGivenCost[newCost] === undefined) { nodesWithGivenCost[newCost] = [] }
      if (newCost < costToReachNode[next.dest]) {
        costToReachNode[next.dest] = newCost;
        pq.add(newCost)
        nodesWithGivenCost[newCost].push(next.dest)
      }
      // console.log({ next })
    }
  }
  return costToReachNode
};
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
  let graph = new Graph(n, edges)
  let minReachable = Infinity
  let city = -1
  let distMemo = {}
  for (let a = 0; a < n; a++) {
    let reachableCount = 0
    if (distMemo[a] === undefined) { distMemo[a] = {} }
    let dist = graph.shortestPath(a, distanceThreshold)
    for (let b = 0; b < n; b++) {
      if (a === b) { continue }
      if (dist[b] <= distanceThreshold) {
        reachableCount++
      }
    }
    if (reachableCount <= minReachable) {
      city = a
      minReachable = reachableCount
    }
  }
  return city
};

const { n, edges, distanceThreshold } = require("./26bigtest")
const { n2, edges2, distanceThreshold2 } = require("./26bigTest2")
const tests = [
  { args: [4, [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], 4], out: 3 },
  { args: [5, [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], 2], out: 0 },
  { args: [6, [[0, 3, 7], [2, 4, 1], [0, 1, 5], [2, 3, 10], [1, 3, 6], [1, 2, 1]], 417], out: 5 },
  { args: [n, edges, distanceThreshold], out: 97 },
  { args: [n2, edges2, distanceThreshold2], out: 99 },
];

tests.forEach((t, i) => {
  let res = findTheCity(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});