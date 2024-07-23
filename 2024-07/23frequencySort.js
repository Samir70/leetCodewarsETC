var frequencySort = function (nums) {
  let tally = {}
  for (let n of nums) {
    tally[n] = (tally[n] || 0) + 1
  }
  return Object.keys(tally)
    .sort((a, b) => tally[a] === tally[b] ? b - a : tally[a] - tally[b])
    .map(c => Array(tally[c]).fill(c).join(',')).join(',').split(",")
    .map(Number)
};

const tests = [
  { args: [[1, 1, 2, 2, 2, 3]], out: [3, 1, 1, 2, 2, 2] },
  { args: [[2, 3, 1, 3, 2]], out: [1, 3, 3, 2, 2] },
  { args: [[-1, 1, -6, 4, 5, -6, 1, 4, 1]], out: [5, -1, 4, 4, -6, -6, 1, 1, 1] },
];

tests.forEach((t, i) => {
  let res = frequencySort(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});