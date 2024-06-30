/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var maxNumEdgesToRemove = function (n, edges) {
  let aliceComponentLog = [...Array(n + 1).keys()].map((x, i) => i);
  let bobComponentLog = [...Array(n + 1).keys()].map((x, i) => i);
  let aliceRanks = Array(n + 1).fill(1)
  let bobRanks = Array(n + 1).fill(1)
  let [aliceMaxRank, bobMaxRank] = [0, 0]
  let edgesToRemove = edges.length
  const findComp = (log, node) => log[node] === node ? node : findComp(log, log[node])
  const unite = (log, ranks, u, v) => {
    let [compU, compV] = [findComp(log, u), findComp(log, v)]
    if (compU !== compV) {
      let maxRank
      if (ranks[compU] <= ranks[compV]) {
        log[compU] = compV
        ranks[compV] += ranks[compU]
        maxRank = ranks[compV]
      } else {
        log[compV] = compU
        ranks[compU] += ranks[compV]
        maxRank = ranks[compU]
      }
      return maxRank
    }
    // no change needed, u, v, already in same component
    return ranks[compU]
  }
  let threes = edges.filter(e => e[0] === 3)
  for (let [_, u, v] of threes) {
    if (findComp(aliceComponentLog, u) !== findComp(aliceComponentLog, v)) {
      aliceMaxRank = Math.max(aliceMaxRank, unite(aliceComponentLog, aliceRanks, u, v))
      bobMaxRank = Math.max(bobMaxRank, unite(bobComponentLog, bobRanks, u, v))
      edgesToRemove--
    }
    // if (findComp(bobComponentLog, u) !== findComp(bobComponentLog, v)) {
    // }
    if (aliceMaxRank === n && bobMaxRank === n) {
      return edgesToRemove
    }
  }
  for (let [type, u, v] of edges) {
    if (type === 3) { continue }
    if (type === 1 && findComp(aliceComponentLog, u) !== findComp(aliceComponentLog, v)) {
      aliceMaxRank = Math.max(aliceMaxRank, unite(aliceComponentLog, aliceRanks, u, v))
      edgesToRemove--
      // console.log({ added: [type, u, v], aliceMaxRank, edgesToRemove })
    }
    if (type === 2 && findComp(bobComponentLog, u) !== findComp(bobComponentLog, v)) {
      bobMaxRank = Math.max(bobMaxRank, unite(bobComponentLog, bobRanks, u, v))
      edgesToRemove--
      // console.log({ added: [type, u, v], bobMaxRank, edgesToRemove })
    }
    if (aliceMaxRank === n && bobMaxRank === n) {
      // console.log({ aliceComponentLog, aliceMaxRank })
      // console.log({ bobComponentLog, bobMaxRank })
      return edgesToRemove
    }
  }
  return -1
};

const tests = [
  { args: [4, [[3, 1, 2], [3, 2, 3], [1, 1, 3], [1, 2, 4], [1, 1, 2], [2, 3, 4]]], out: 2 },
  { args: [4, [[3, 1, 2], [3, 2, 3], [1, 1, 4], [2, 1, 4]]], out: 0 },
  { args: [4, [[3, 2, 3], [1, 1, 2], [2, 3, 4]]], out: -1 },
  {
    args: [13, [[1, 1, 2], [2, 1, 3], [3, 2, 4], [3, 2, 5], [1, 2, 6], [3, 6, 7], [3, 7, 8], [3, 6, 9], [3, 4, 10], [2, 3, 11], [1, 5, 12], [3, 3, 13], [2, 1, 10], [2, 6, 11], [3, 5, 13], [1, 9, 12], [1, 6, 8], [3, 6, 13], [2, 1, 4], [1, 1, 13], [2, 9, 10], [2, 1, 6], [2, 10, 13], [2, 2, 9], [3, 4, 12], [2, 4, 7], [1, 1, 10], [1, 3, 7], [1, 7, 11], [3, 3, 12], [2, 4, 8], [3, 8, 9], [1, 9, 13], [2, 4, 10], [1, 6, 9], [3, 10, 13], [1, 7, 10], [1, 1, 11], [2, 4, 9], [3, 5, 11], [3, 2, 6], [2, 1, 5], [2, 5, 11], [2, 1, 7], [2, 3, 8], [2, 8, 9], [3, 4, 13], [3, 3, 8], [3, 3, 11], [2, 9, 11], [3, 1, 8], [2, 1, 8], [3, 8, 13], [2, 10, 11], [3, 1, 5], [1, 10, 11], [1, 7, 12], [2, 3, 5], [3, 1, 13], [2, 4, 11], [2, 3, 9], [2, 6, 9], [2, 1, 13], [3, 1, 12], [2, 7, 8], [2, 5, 6], [3, 1, 9], [1, 5, 10], [3, 2, 13], [2, 3, 6], [2, 2, 10], [3, 4, 11], [1, 4, 13], [3, 5, 10], [1, 4, 10], [1, 1, 8], [3, 3, 4], [2, 4, 6], [2, 7, 11], [2, 7, 10], [2, 3, 12], [3, 7, 11], [3, 9, 10], [2, 11, 13], [1, 1, 12], [2, 10, 12], [1, 7, 13], [1, 4, 11], [2, 4, 5], [1, 3, 10], [2, 12, 13], [3, 3, 10], [1, 6, 12], [3, 6, 10], [1, 3, 4], [2, 7, 9], [1, 3, 11], [2, 2, 8], [1, 2, 8], [1, 11, 13], [1, 2, 13], [2, 2, 6], [1, 4, 6], [1, 6, 11], [3, 1, 2], [1, 1, 3], [2, 11, 12], [3, 2, 11], [1, 9, 10], [2, 6, 12], [3, 1, 7], [1, 4, 9], [1, 10, 12], [2, 6, 13], [2, 2, 12], [2, 1, 11], [2, 5, 9], [1, 3, 8], [1, 7, 8], [1, 2, 12], [1, 5, 11], [2, 7, 12], [3, 1, 11], [3, 9, 12], [3, 2, 9], [3, 10, 11]]],
    out: 114
  }
];

tests.forEach((t, i) => {
  let res = maxNumEdgesToRemove(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});

