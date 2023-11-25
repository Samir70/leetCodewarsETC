/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSumAbsoluteDifferences = function (nums) {
  const out = [];
  let leftCount = 0, rightCount = nums.length - 1;
  let sum = 0;
  for (let n of nums) { sum += n - nums[0] }
  out.push(sum)
  for (let i = 1; i < nums.length; i++) {
    leftCount++;
    let diff = nums[i] - nums[i - 1]
    let sumChange = diff * (leftCount - rightCount)
    sum += sumChange
    rightCount--;
    out.push(sum)
  }
  return out
};

const tests = [
  { args: [[2, 3, 5]], out: [4, 3, 5] },
  { args: [[1, 4, 6, 8, 10]], out: [24, 15, 13, 15, 21] },
];

tests.forEach((t, i) => {
  let res = getSumAbsoluteDifferences(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});