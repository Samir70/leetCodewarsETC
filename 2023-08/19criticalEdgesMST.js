/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
const manhattanDistance = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

var findCriticalAndPseudoCriticalEdges = function (n, edges) {
  let parent = [...Array(n)].map((x, i) => i);
  let ranks = Array(n).fill(1)

  const findParent = node => {
    return parent[node] === node ? node : findParent(parent[node])
  }
  const union = (a, b) => {
    let compA = findParent(a)
    let compB = findParent(b)
    if (compA !== compB) {
      if (ranks[compA] <= ranks[compB]) {
        parent[compA] = compB
        ranks[compB] += ranks[compA]
      } else {
        parent[compB] = compA
        ranks[compA] += ranks[compB]
      }
      return true
    }
    return false
  }

  let newEdges = edges.map((edge, i) => [i, ...edge])
  newEdges.sort((a, b) => a[3] - b[3]);

  let numEdgesUsed = 0, weight = 0;
  for (let [i, a, b, w] of newEdges) {
    if (findParent(a) === findParent(b)) {
      continue
    } else {
      union(a, b)
      numEdgesUsed++;
      weight += w;
    }
    if (numEdgesUsed === n - 1) { break }
  }
  // console.log("found MST with weight", weight)
  let actualMSTWeight = weight;
  let critical = []
  let pseudoCriticial = []
  for (let [i, a, b, w] of newEdges) {
    parent = [...Array(n)].map((x, i) => i);
    ranks = Array(n).fill(1)
    // console.log("considering", {i, a, b, w})
    numEdgesUsed = 0, weight = 0;
    for (let [j, u, v, w2] of newEdges) {
      // console.log("can we skip?", {j, u, v, w2, weight})
      if (i === j) { continue }
      if (findParent(u) === findParent(v)) {
        // console.log("parents match")
        continue
      } else {
        union(u, v)
        numEdgesUsed++;
        weight += w2;
      }
      if (numEdgesUsed === n - 1) {
        break
      }
    }
    // console.log({skipped: i, weight, numEdgesUsed, n})
    if (numEdgesUsed !== n - 1 || weight > actualMSTWeight) {
      critical.push(i)
      continue
    }
    numEdgesUsed = 1, weight = w;
    parent = [...Array(n)].map((x, i) => i);
    ranks = Array(n).fill(1)
    union(a, b)
    for (let [j, u, v, w2] of newEdges) {
      if (i === j) { continue }
      if (findParent(u) === findParent(v)) {
        continue
      } else {
        union(u, v)
        numEdgesUsed++;
        weight += w2;
      }
      if (numEdgesUsed === n - 1 && weight === actualMSTWeight) {
        pseudoCriticial.push(i)
        break
      }
    }
  }
  return [critical, pseudoCriticial]
};

const tests = [
  { args: [5, [[0, 1, 1], [1, 2, 1], [2, 3, 2], [0, 3, 2], [0, 4, 3], [3, 4, 3], [1, 4, 6]]], out: [[0, 1], [2, 3, 4, 5]] },
  { args: [4, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 1]]], out: [[], [0, 1, 2, 3]] },
  {
    args: [6, [[0, 1, 1], [1, 2, 1], [0, 2, 1], [2, 3, 4], [3, 4, 2], [3, 5, 2], [4, 5, 2]]], out: [[[3], [0, 1, 2, 4, 5, 6]]]
  }
];

tests.forEach((t, i) => {
  // if (i !== 2) { return }
  let res = findCriticalAndPseudoCriticalEdges(...t.args);
  if (res.join(',') !== t.out.join(',')) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});