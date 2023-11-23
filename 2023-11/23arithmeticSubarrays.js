/**
 * @param {number[]} nums
 * @param {number[]} l
 * @param {number[]} r
 * @return {boolean[]}
 */
var checkArithmeticSubarrays = function (nums, l, r) {
  let out = []
  let sorted = nums.map((n, i) => [n, i]).sort((a, b) => a[0] - b[0])
  const isArithmetic = arr => {
    if (arr.length <= 1) { return true }
    let diff = arr[1][0] - arr[0][0]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i][0] - arr[i - 1][0] !== diff) { return false }
    }
    return true
  }
  for (let i = 0; i < l.length; i++) {
    let [left, right] = [l[i], r[i]]
    let subarray = sorted.filter(n => n[1] >= left && n[1] <= right)
    // console.log({ left, right, subarray })
    out.push(isArithmetic(subarray))
  }
  return out
};

const tests = [
  { args: [[4, 6, 5, 9, 3, 7], [0, 0, 2], [2, 3, 5]], out: [true, false, true] },
  { args: [[-12, -9, -3, -12, -6, 15, 20, -25, -20, -15, -10], [0, 1, 6, 4, 8, 7], [4, 4, 9, 7, 9, 10]], out: [false, true, false, false, true, true] },
];

tests.forEach((t, i) => {
  let res = checkArithmeticSubarrays(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});