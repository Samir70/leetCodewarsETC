/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var beautifulSubsets = function (nums, k) {
  const countSubsets = (idx, mask) => {
    if (idx === nums.length) {
      return mask > 0 ? 1 : 0
    }
    let isBeautiful = true;
    for (let j = 0; j < idx; j++) {
      if (((1 << j) & mask) === 0 || Math.abs(nums[j] - nums[idx]) !== k) {
        continue
      } else {
        isBeautiful = false
        break
      }
    }
    let skip = countSubsets(idx + 1, mask)
    let include = isBeautiful ? countSubsets(idx + 1, mask + (1 << idx)) : 0
    // console.log({ cur: nums[idx], mask, skip, include, isBeautiful })
    return skip + include
  }
  return countSubsets(0, 0)
};

const tests = [
  { args: [[2, 4, 6], 2], out: 4 },
  { args: [[1], 1], out: 1 },
  { args: [[1, 1, 1, 1, 1], 1], out: 31 },
  { args: [[2, 4, 6, 8, 10, 11, 12, 13, 1, 3, 5, 7, 9, 14, 15, 16, 17, 18, 19, 20], 200], out: 1048575 },
  { args: [[2, 4, 6, 8, 10, 11, 12, 13, 1, 3, 5, 7, 9, 14, 15, 16, 17, 18, 19, 20], 3], out: 24275 },
];

tests.forEach((t, i) => {
  let res = beautifulSubsets(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});