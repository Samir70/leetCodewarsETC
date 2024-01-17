/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (nums) {
  const tally = {}
  for (let n of nums) {
    tally[n] = (tally[n] || 0) + 1
  }
  const freqs = new Set()
  for (let key in tally) {
    if (freqs.has(tally[key])) {return false}
    freqs.add(tally[key])
  }
  return true
};

const tests = [
  { args: [[1, 2, 2, 1, 1, 3]], out: true },
  { args: [[1, 2]], out: false },
  { args: [[-3, 0, 1, -3, 1, 1, 1, -3, 10, 0]], out: true },
];

tests.forEach((t, i) => {
  let res = uniqueOccurrences(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});