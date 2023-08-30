/**
 * @param {number[]} nums
 * @return {number}
 */
const makeIncreasing = (n, right) => {
  if (n < right) { return { steps: 0, newLimit: n } }
  /**
   * suppose 
   * n = k*right + m 
   * if m == 0, then we can return right
   * otherwise m < right
   * (k+1)*(right - 1) + m = kr - k + r - 1 + m = n + r - k - 1
   * so n = (k+1)(r-1) + m + k - r + 1
   * if m + k - r + 1 >= k + 1 then m >= r, which isn't how we defined m
   * So with k+1 slots we can fill with r-1 and then spread the extra among them
   * eg:
   * 41 = 5*7 + 6 = 6*6 + 5
   * so 41 = 6 + 7 + 7 + 7 + 7 + 7
   * The extra 5 gets spread over the five rightmost 6s
   * 127 = 3x36 + 19, but 4 x35 = 140 which is too big
   * Try splitting when limit is 5
   * 13 = 4 + 4 + 5
   * 12 = 4 + 4 + 4
   * 11 = 3 + 4 + 4
   * 10 = 3 + 3 + 4
   * for all of them, we want to split into three numbers
   * so new limit is floor(n / 3)
   */
  if (n % right === 0) {
    return {
      steps: (n / right) - 1, newLimit: right
    }
  } else {
    let steps = Math.floor(n/right)
    let newLimit = Math.floor(n / (steps + 1))
    return {
      steps, newLimit
    }
  }
}
var minimumReplacement = function (nums) {
  let totalSteps = 0, limit = nums[nums.length - 1]
  for (let i = nums.length - 2; i >= 0; i--) {
    let n = nums[i]
    let solveThisIndex = makeIncreasing(n, limit);
    totalSteps += solveThisIndex.steps;
    // console.log({ num: nums[i], limit, newLimit: solveThisIndex.newLimit, steps: solveThisIndex.steps })
    limit = solveThisIndex.newLimit;
  }
  return totalSteps
};

const tests = [
  { args: [[3, 9, 3]], out: 2 },
  { args: [[1, 2, 3, 4, 5]], out: 0 },
  { args: [[3, 10, 3]], out: 4 },
  { args: [[1, 2, 3, 4, 5, 1]], out: 10 },
  { args: [[368, 112, 2, 282, 349]], out: 238 },
  { args: [[368, 112, 2, 282, 349, 127]], out: 242 },
  { args: [[368, 112, 2, 282, 349, 127, 36, 98]], out: 261 },
  { args: [[368, 112, 2, 282, 349, 127, 36, 98, 371, 79, 309]], out: 266 },
  { args: [[368, 112, 2, 282, 349, 127, 36, 98, 371, 79, 309, 221, 175, 262, 224, 215, 230, 250, 84, 269, 384, 328, 118, 97, 17, 105, 342, 344, 242, 160, 394, 17, 120, 335, 76, 101, 260, 244, 378, 375, 164, 190, 320, 376, 197, 398, 353, 138, 362, 38, 54, 172, 3, 300, 264, 165, 251, 24, 312, 355, 237, 314, 397, 101, 117, 268, 36, 165, 373, 269, 351, 67, 263, 332, 296, 13, 118, 294, 159, 137, 82, 288, 250, 131, 354, 261, 192, 111, 16, 139, 261, 295, 112, 121, 234, 335, 256, 303, 328, 242, 260, 346, 22, 277, 179, 223]], out: 17748 }
];

tests.forEach((t, i) => {
  // if (i !== 6) { return }
  let res = minimumReplacement(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});

// console.log(makeIncreasing(346, 22))
// console.log(makeIncreasing(127, 36))