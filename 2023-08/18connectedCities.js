/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
/**
 * With a set, it beat less than half on speed (60% on memory)
 * refactored to have a boolean array, beats 86% (and beats 90% on memory)
 */
var maximalNetworkRank = function (n, roads) {
  const roadsPerCity = Array(n).fill(0);
  const roadConnect = []
  for (let city = 0; city < n; city++) {
    roadConnect.push(Array(n).fill(false))
  }
  // let roadSet = new Set();
  for (let [a, b] of roads) {
    roadsPerCity[a]++;
    roadsPerCity[b]++;
    // let key = a <= b ? [a, b].join(",") : [b, a].join(",")
    // roadSet.add(key)
    roadConnect[a][b] = true
    roadConnect[b][a] = true
  }
  let maxRank = 0
  for (let a = 0; a < n; a++) {
    for (let b = a + 1; b < n; b++) {
      let rank = roadsPerCity[a] + roadsPerCity[b];
      let key = [a, b].join(",")
      // if (roadSet.has(key)) { rank-- }
      if (roadConnect[a][b]) { rank-- }
      if (rank > maxRank) { maxRank = rank }
    }
  }
  return maxRank
};

const tests = [
  { args: [4, [[0, 1], [0, 3], [1, 2], [1, 3]]], out: 4 },
  { args: [5, [[0, 1], [0, 3], [1, 2], [1, 3], [2, 3], [2, 4]]], out: 5 },
  { args: [8, [[0, 1], [1, 2], [2, 3], [2, 4], [5, 6], [5, 7]]], out: 5 },
  { args: [100, [[0, 1], [1, 2], [2, 3], [2, 4], [5, 6], [5, 7]]], out: 5 },
];

tests.forEach((t, i) => {
  let res = maximalNetworkRank(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});