/**
 * @param {number[]} nums
 * @return {number}
 */
var maxFrequencyElements = function (nums) {
  let tally = {}
  let max = 0
  for (let n of nums) {
    tally[n] = (tally[n] || 0) + 1
    if (tally[n] > max) { max = tally[n] }
  }
  let sum = 0
  for (let val of Object.keys(tally)) {
    sum += tally[val] === max ? max : 0
  }
  return sum
};

const tests = [
  { args: [[1, 2, 2, 3, 1, 4]], out: 4 },
  { args: [[1, 2, 3, 4, 5]], out: 5 },
  { args: [[5]], out: 1 },
];

tests.forEach((t, i) => {
  let res = maxFrequencyElements(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});