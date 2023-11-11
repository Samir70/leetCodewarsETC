/**
* @param {number} n
* @param {number[][]} edges
*/
var Graph = function (n, edges) {
  this.n = n;
  this.graph = []
  for (let i = 0; i < n; i++) {
    this.graph.push(Array(n).fill(Infinity))
    this.graph[i][i] = 0
  }
  for (let [a, b, cost] of edges) {
    this.graph[a][b] = cost
  }
  for (let intermediate = 0; intermediate < n; intermediate++) {
    for (let a = 0; a < n; a++) {
      for (let b = 0; b < n; b++) {
        this.graph[a][b] = Math.min(
          this.graph[a][b],
          this.graph[a][intermediate] + this.graph[intermediate][b]
        )
      }
    }
  }
  // console.log(this.graph)
};

/** 
* @param {number[]} edge
* @return {void}
*/
Graph.prototype.addEdge = function (edge) {
  let [a, b, cost] = edge;
  for (let i = 0; i < this.n; i++) {
    for (let j = 0; j < this.n; j++) {
      this.graph[i][j] = Math.min(
        this.graph[i][j],
        this.graph[i][a] + cost + this.graph[b][j]
      )
    }
  }
};

/** 
* @param {number} node1 
* @param {number} node2
* @return {number}
*/
Graph.prototype.shortestPath = function (node1, node2) {
  return this.graph[node1][node2] === Infinity ? -1 : this.graph[node1][node2]
};

/** 
* Your Graph object will be instantiated and called as such:
* var obj = new Graph(n, edges)
* obj.addEdge(edge)
* var param_2 = obj.shortestPath(node1,node2)
*/

// let obj = new Graph(4, [[0, 2, 5], [0, 1, 2], [1, 2, 1], [3, 0, 3]])
// console.log(obj.shortestPath(3, 2)); // 6
// console.log(obj.shortestPath(0, 3)); // -1
// obj.addEdge([1,3,4])
// console.log(obj.shortestPath(0, 3)); // 6

// let ops = ["Graph", "shortestPath", "addEdge", "addEdge", "addEdge", "shortestPath", "shortestPath", "shortestPath", "addEdge", "shortestPath", "addEdge", "shortestPath", "shortestPath", "addEdge", "addEdge", "shortestPath", "addEdge", "addEdge", "addEdge", "addEdge", "addEdge", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath"]
// let args = [[4, []], [2, 2], [[0, 3, 745857]], [[1, 3, 432074]], [[0, 2, 103840]], [0, 2], [0, 1], [1, 0], [[2, 0, 100674]], [0, 2], [[1, 2, 977334]], [2, 1], [0, 0], [[0, 1, 686587]], [[3, 1, 65074]], [2, 0], [[2, 3, 871421]], [[3, 0, 19073]], [[1, 0, 751462]], [[2, 1, 12018]], [[3, 2, 989255]], [1, 3], [2, 0], [3, 1], [3, 2], [2, 3], [2, 2], [3, 3], [2, 1], [3, 0], [3, 3], [1, 0], [0, 3], [1, 2], [3, 0], [2, 2]]
// let expected = [null, 0, null, null, null, 103840, -1, -1, null, 103840, null, -1, 0, null, null, 100674, null, null, null, null, null, 432074, 100674, 65074, 122913, 444092, 0, 0, 12018, 19073, 0, 451147, 547932, 554987, 19073, 0]

let ops = ["Graph", "addEdge", "addEdge", "shortestPath", "addEdge", "addEdge", "addEdge", "addEdge", "addEdge", "addEdge", "shortestPath", "addEdge", "addEdge", "shortestPath", "addEdge", "shortestPath", "shortestPath", "addEdge", "addEdge", "addEdge", "shortestPath", "addEdge", "shortestPath", "addEdge", "shortestPath", "addEdge", "addEdge", "shortestPath", "addEdge", "addEdge", "shortestPath", "addEdge", "addEdge", "shortestPath", "addEdge", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath", "shortestPath"]
let args = [[6, [[0, 3, 8207], [5, 0, 745191], [3, 1, 973477], [0, 5, 565018], [4, 0, 995039], [5, 4, 460358], [0, 1, 550844]]], [[2, 5, 7274]], [[5, 1, 6532]], [2, 2], [[4, 5, 794]], [[2, 0, 730]], [[0, 4, 188]], [[0, 2, 171638]], [[2, 3, 72]], [[2, 1, 67]], [1, 1], [[2, 4, 50]], [[3, 4, 49]], [3, 5], [[4, 2, 31]], [2, 5], [2, 4], [[4, 1, 15]], [[5, 2, 14]], [[1, 4, 508810]], [4, 5], [[1, 2, 11]], [5, 5], [[4, 3, 7]], [2, 3], [[3, 2, 118110]], [[1, 5, 2]], [0, 2], [[1, 0, 488760]], [[3, 0, 556274]], [5, 3], [[5, 3, 1]], [[1, 3, 338698]], [2, 4], [[3, 5, 672788]], [1, 3], [1, 2], [1, 3], [5, 2], [2, 1], [3, 0], [5, 5], [2, 1], [3, 4], [5, 0], [0, 0], [4, 0], [2, 5], [0, 4], [1, 2], [3, 2], [3, 4], [2, 4], [2, 4]]
let expected = [null, null, null, 0, null, null, null, null, null, null, 0, null, null, 843, null, 844, 50, null, null, null, 794, null, 0, null, 57, null, null, 214, null, null, 71, null, null, 50, null, 3, 11, 3, 14, 65, 805, 0, 65, 49, 744, 0, 756, 67, 188, 11, 75, 49, 50, 50]

let obj = new Graph(...args[0])
for (let op = 1; op < ops.length; op++) {
  let res = obj[ops[op]](...args[op])
  if (res !== expected[op] && expected[op] !== null) {
    console.log({ op: ops[op], args: args[op], got: res, expected: expected[op] })
  }
}