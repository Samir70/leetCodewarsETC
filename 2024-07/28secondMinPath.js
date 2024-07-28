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
 * @param {number} time
 * @param {number} change
 * @return {number}
 */
var secondMinimum = function (n, edges, time, change) {
  const nextGreen = t => {
    let div = Math.floor(t / change)
    return div % 2 ? change * (div + 1) : t
  }
  let graph = {}
  for (let [a, b] of edges) {
    if (graph[a] === undefined) { graph[a] = [] }
    if (graph[b] === undefined) { graph[b] = [] }
    graph[a].push(b)
    graph[b].push(a)
  }
  let dist1 = Array(n + 1).fill(Infinity)
  let dist2 = Array(n + 1).fill(Infinity)
  dist1[1] = 0
  let freq = Array(n + 1).fill(0)
  let pq = new Heap()
  let nodesWithDist = { 0: [1] }
  pq.add(0)
  while (pq.peek() !== null) {
    let dist = pq.poll()
    if (nodesWithDist[dist] === undefined) { continue }
    if (nodesWithDist[dist].length === 0) { continue }
    let cur = nodesWithDist[dist].pop()
    freq[cur]++
    // if (cur === n) { console.log({ n, d: dist2[n] }) }
    if (cur === n && freq[cur] === 2) { return dist2[n] }
    for (let neighbour of graph[cur]) {
      let d2N = nextGreen(dist) + time
      // console.log({ dist, d2N })
      // if (neighbour === n) {
      //   console.log({ neighbour, d2N, d1: dist1[n], d2: dist2[n] })
      // }
      if (d2N < dist1[neighbour]) {
        dist2[neighbour] = dist1[neighbour]
        dist1[neighbour] = d2N
        pq.add(d2N)
        if (nodesWithDist[d2N] === undefined) { nodesWithDist[d2N] = [] }
        nodesWithDist[d2N].push(neighbour)
      } else if (d2N > dist1[neighbour] && d2N < dist2[neighbour]) {
        dist2[neighbour] = d2N
        pq.add(d2N)
        if (nodesWithDist[d2N] === undefined) { nodesWithDist[d2N] = [] }
        nodesWithDist[d2N].push(neighbour)
      }
      // console.log({ cur, neighbour, dist, d2N, dist1, dist2, freq, heap: pq.size })
    }
  }
  return 0
};

const { n, edges, time, change } = require("./28bigTest")
const tests = [
  { args: [5, [[1, 2], [1, 3], [1, 4], [3, 4], [4, 5]], 3, 5], out: 13 },
  { args: [2, [[1, 2]], 3, 2], out: 11 },
  { args: [n, edges, time, change], out: 3142 },
];

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = secondMinimum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});