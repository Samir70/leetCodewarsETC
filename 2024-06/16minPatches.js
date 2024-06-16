/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number}
 */
var minPatches = function (nums, n) {
  let added = 0, canMakeUpTo = 0, i = 0
  while (canMakeUpTo < n) {
    if (i < nums.length && nums[i] <= canMakeUpTo + 1) {
      canMakeUpTo += nums[i++]
    } else {
      added++
      canMakeUpTo += canMakeUpTo + 1
      // console.log({ added, canMakeUpTo, i })
    }
  }
  // console.log({ added, ca  nMakeUpTo, i })
  return added
};

const tests = [
  { args: [[1, 3], 6], out: 1 },
  { args: [[1, 5, 10], 20], out: 2 },
  { args: [[1, 9999], 600000000], out: 28 },
  { args: [[10, 768], 200000000], out: 26 },
  /**
   * [0,1]
   * [0,1, 5, 6]
   * [0,1, 5, 6, 10, 11, 15, 16]
   * add 2: [0,1,2, 3, 5, 6, 7,8,10, 11,12, 13 15, 16,17,18]
   * add 4: [0,1,2, 3, 4, 5, 6, 7,8,9,10, 11,12, 13,14, 15, 16,17,18,19,20]
   */
  { args: [[1, 2, 2], 5], out: 0 },
];

tests.forEach((t, i) => {
  let res = minPatches(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});