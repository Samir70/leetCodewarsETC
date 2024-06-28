/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var maximumImportance = function (n, roads) {
  let tally = Array(n).fill(0)
  for (let [a, b] of roads) {
    tally[a]++
    tally[b]++
  }
  tally.sort((a, b) => a - b)
  // console.log(tally)
  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += (i + 1) * tally[i]
  }
  return sum
};

const tests = [
  { args: [5, [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3], [2, 4]]], out: 43 },
  { args: [5, [[0, 3], [2, 4], [1, 3]]], out: 20 },
];

tests.forEach((t, i) => {
  let res = maximumImportance(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});