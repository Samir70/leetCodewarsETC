/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function (nums, k) {
  let tally = { 0: 1 }, count = 0, sum = 0
  for (let n of nums) {
    sum += n % 2
    tally[sum] = (tally[sum] || 0) + 1
    count += tally[sum - k] || 0
  }
  // console.log(oddEven, tally)
  return count
};

const tests = [
  { args: [[1, 1, 2, 1, 1], 3], out: 2 },
  { args: [[2, 4, 6], 1], out: 0 },
  { args: [[2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2], out: 16 },
];

tests.forEach((t, i) => {
  let res = numberOfSubarrays(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});