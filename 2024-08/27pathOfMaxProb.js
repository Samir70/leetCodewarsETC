/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */

// Bellman-Ford or Shortest-path faster algorithm SPFA
// single source shortest path
// Or Dijkstra's algorithm
var maxProbability = function (n, edges, succProb, start, end) {
  let queue = [start], pointer = 0
  let maxProbAtI = Array(n).fill(0)
  maxProbAtI[start] = 1
  let edgeHash = {}
  for (let i = 0; i < edges.length; i++) {
    let [a, b] = edges[i]
    if (edgeHash[a] === undefined) {edgeHash[a] = []}
    if (edgeHash[b] === undefined) {edgeHash[b] = []}
    edgeHash[a].push({goingto: b, prob: succProb[i]})
    edgeHash[b].push({goingto: a, prob: succProb[i]})
  }
  // console.log(edgeHash)
  while (pointer < queue.length) {
    let cur = queue[pointer++];
    // console.log({cur, neighbours: edgeHash[cur]})
    if (edgeHash[cur] === undefined) {continue}
    for (let next of edgeHash[cur]) {
      let newProb = maxProbAtI[cur] * next.prob;
      if (newProb > maxProbAtI[next.goingto]){
        maxProbAtI[next.goingto] = newProb;
        queue.push(next.goingto)
      }
    }
  }
  return maxProbAtI[end]
};

const tests = [
  { args: [3, [[0, 1], [1, 2], [0, 2]], [0.5, 0.5, 0.2], 0, 2], out: 0.25 },
  { args: [3, [[0, 1], [1, 2], [0, 2]], [0.5, 0.5, 0.3], 0, 2], out: 0.3 },
  { args: [3, [[0, 1]], [0.5], 0, 2], out: 0 }
];

tests.forEach((t, i) => {
  let res = maxProbability(...t.args);
  if (res - t.out > 0.00001) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});