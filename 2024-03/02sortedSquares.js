/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let leftPointer = 0, rightPointer = nums.length - 1;
  let leftVal = nums[0] ** 2, rightVal = nums[rightPointer] ** 2;
  let out = Array(nums.length)
  for (let i = nums.length - 1; i >= 0; i--) {
    if (leftVal > rightVal) {
      out[i] = leftVal
      leftPointer++
      leftVal = nums[leftPointer] ** 2
    } else {
      out[i] = rightVal
      rightPointer--
      rightVal = nums[rightPointer] ** 2
    }
  }
  return out
};
// var sortedSquares = function (nums) {
//   return nums.map(x => x * x).sort((a, b) => a - b)
// };

const tests = [
  { args: [[-4, -1, 0, 3, 10]], out: [0, 1, 9, 16, 100] },
  { args: [[-7, -3, 2, 3, 11]], out: [4, 9, 9, 49, 121] },
];

tests.forEach((t, i) => {
  let res = sortedSquares(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});