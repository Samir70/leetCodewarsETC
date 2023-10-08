/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function (nums1, nums2) {
  let max1 = Math.max(...nums1), min1 = Math.min(...nums1);
  let max2 = Math.max(...nums2), min2 = Math.min(...nums2);
  if (max1 < 0 && min2 > 0) { return max1 * min2 }
  if (max2 < 0 && min1 > 0) { return max2 * min1 }
  const memo = {}
  const dp = (i, j) => {
    if (i === nums1.length || j === nums2.length) { return 0 }
    let key = [i, j].join(",");
    if (memo[key] !== undefined) { return memo[key] }
    let useThisPair = nums1[i] * nums2[j] + dp(i + 1, j + 1);
    let ans = Math.max(useThisPair, dp(i + 1, j), dp(i, j + 1));
    // console.log({ key, useThisPair, skip1: dp(i + 1, j), skip2: dp(i, j + 1) })
    memo[key] = ans;
    return ans
  }

  return dp(0, 0)
};

const tests = [
  { args: [[2, 1, -2, 5], [3, 0, -6]], out: 18 },
  { args: [[3, -2], [2, -6, 7]], out: 21 },
  { args: [[-1, -1], [1, 1]], out: -1 },
  { args: [[-1, 0], [1, 0]], out: 0 },
  {
    args: [
      [14, 9, -19, 5, -19, 6, 11, 8, -1, 12, 11, -20, -10, -13, 0, 8, 7, -4, -16, -11, 17, -2, 14, 7, -4, -19, -8, -17, 15, 16, 20, 17, 17, -10, 17, 16],
      [-7, -4, 15, 5, -19, 8, -1, -1, 12, -17, 6, -10, -6, -13, 7, -7, 5, 20, 6, -13, -10, 13, -16, -13, -6, 15]],
    out: 3184
  }
];

tests.forEach((t, i) => {
  let res = maxDotProduct(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});