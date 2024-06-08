/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  // make cumulative sum, 
  // if you see the same value twice there could be a subarray len >= 2
  // shortcut: if nums has more than k values, 
  // every poss value of sum could be used once, then there must be a repeat
  if (nums.length < 2) { return false }
  // if (nums.length > k) {
  //   // doesn't work for [1,0,1,0,1] and k = 4 since the repeats are too close
  //   return true
  // }
  // set didn't work since need to know how long ago we saw the same number
  let seen = { 0: -1 }, sum = 0;
  for (let i = 0; i < nums.length; i++) {
    n = nums[i]
    sum += n
    sum %= k
    if (seen[sum] === undefined) {
      seen[sum] = i
    } else {
      // console.log({sum, i, lastSeen: seen[sum]})
      if (i - seen[sum] >= 2) { return true }
    }
  }
  return false
};

const tests = [
  { args: [[0], 1], out: false }, // not length 2
  { args: [[23, 2, 4, 6, 7], 6], out: true },
  { args: [[23, 2, 6, 4, 7], 6], out: true },
  { args: [[1, 1, 1, 1, 1], 6], out: false },
  { args: [[1, 1, 1, 1, 1, 1], 6], out: true },
  { args: [[1, 1, 1, 1, 1, 1, 1], 6], out: true },
  { args: [[23, 2, 6, 4, 7], 13], out: false },
  { args: [[23, 2, 4, 6, 6], 7], out: true },
  { args: [[5, 0, 0, 0], 3], out: true },
  { args: [[1, 0, 1, 0, 1], 4], out: false },
  { args: [[1, 2, 12], 6], out: false },
  { args: [[1, 0], 2], out: false },
  { args: [[5, 2, 4], 6], out: true },
];

tests.forEach((t, i) => {
  let res = checkSubarraySum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});