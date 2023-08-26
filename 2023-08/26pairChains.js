/**
 * @param {number[][]} pairs
 * @return {number}
 * [a, b] can be followed by [c, d] in a chain if b < c
 */
var findLongestChain = function (pairs) {
  pairs.sort((a, b) => a[0] - b[0]);
  let n = pairs.length;
  let longestStartingAtI = Array(n).fill(0)
  longestStartingAtI[n - 1] = 1
  let maxChain = 1;
  for (let i = n - 1; i >=0 ; i--) {
    for (let j = i+1; j < n; j++) {
      if (pairs[i][1] < pairs[j][0]) {
        longestStartingAtI[i] = Math.max(longestStartingAtI[i], longestStartingAtI[j] + 1)
      }
    }
    maxChain = Math.max(maxChain, longestStartingAtI[i])
  }
  return maxChain
};

const tests = [
  { args: [[[1, 2], [2, 3], [3, 4]]], out: 2 },
  { args: [[[1, 2], [7, 8], [4, 5]]], out: 3 },
];

tests.forEach((t, i) => {
  let res = findLongestChain(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});