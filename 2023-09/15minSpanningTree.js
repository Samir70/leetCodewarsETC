// https://leetcode.com/problems/min-cost-to-connect-all-points/description/

/**
 * @param {number[][]} points
 * @return {number}
 * Kruskal's algorithm
*/
var minCostConnectPoints = function (points) {
  const manhattanDistance = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  const edgeWeights = []
  const componentLog = {}
  for (let a = 0; a < points.length; a++) {
    componentLog[a] = a;
    for (let b = a + 1; b < points.length; b++) {
      edgeWeights.push({
        points: [a, b],
        dist: manhattanDistance(points[a], points[b])
      })
    }
  }
  edgeWeights.sort((a, b) => a.dist - b.dist)
  // console.log(edgeWeights)
  let numEdgesUsed = 0, weight = 0;
  let ranks = Array(points.length).fill(0)
  const findComponent = p => {
    return componentLog[p] === p ? p : findComponent(componentLog[p])
  }
  const union = (a, b) => {
    let compA = findComponent(a)
    let compB = findComponent(b)
    if (compA !== compB) {
      if (ranks[compA] <= ranks[compB]) {
        componentLog[compA] = compB
        ranks[compB]++
      } else {
        componentLog[compB] = compA
        ranks[compA]++
      }
    }
  }
  for (let curEdge of edgeWeights) {
    // let curEdge = edgeWeights[curPointer];
    let [a, b] = curEdge.points;
    // console.log({curEdge, weight, compA: findComponent(a), compB: findComponent(b)})
    if (findComponent(a) === findComponent(b)) {
      continue
    } else {
      union(a, b)
      numEdgesUsed++;
      weight += curEdge.dist;
    }
    if (numEdgesUsed === points.length - 1) {return weight}
  }
  return weight
};

const tests = [
  { args: [[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]], out: 20 },
  { args: [[[3, 12], [-2, 5], [-4, 1]]], out: 18 },
  { args: [[[2, -3], [-17, -8], [13, 8], [-17, -15]]], out: 53 },
  {args: [[[-8,14],[16,-18],[-19,-13],[-18,19],[20,20],[13,-20],[-15,9],[-4,-8]]], out: 139}
];

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = minCostConnectPoints(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});