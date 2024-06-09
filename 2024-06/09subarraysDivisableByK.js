/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysDivByK = function (nums, k) {
  let timesSeen = { 0: 1 }, sum = 0, count = 0
  // let sums = []
  for (let n of nums) {
    sum += n
    sum %= k
    if (sum < 0) { sum += k }
    count += timesSeen[sum] || 0
    // console.log({ sum, timesSeen })
    timesSeen[sum] = (timesSeen[sum] || 0) + 1
    // sums.push(sum)
  }
  // console.log(sums)
  return count
};

const tests = [
  { args: [[4, 5, 0, -2, -3, 1], 5], out: 7 },
  { args: [[5], 9], out: 0 },
];

tests.forEach((t, i) => {
  let res = subarraysDivByK(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});