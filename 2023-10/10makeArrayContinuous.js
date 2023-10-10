/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  let n = nums.length;
  let setNums = new Set(nums);
  let unique = [...setNums].sort((a, b) => a - b);
  unique.push(Infinity);
  let j = 0, ans = n;
  for (let i = 0; i < unique.length; i++) {
    while (unique[j] < unique[i] + n) { j++ }
    let elementsInRange = j - i
    ans = Math.min(ans, n - elementsInRange)
    // console.log({ n, left: unique[i], right: unique[j], i, j, ans });
  }
  return ans
};

const tests = [
  { args: [[4, 2, 5, 3]], out: 0 },
  { args: [[1, 2, 3, 5, 6]], out: 1 },
  { args: [[1, 1, 7, 5, 6]], out: 2 },
  { args: [[1, 2, 3, 7, 6]], out: 2 },
  { args: [[1, 20, 5, 8, 6]], out: 2 },
  { args: [[1, 10, 100, 1000]], out: 3 },
  { args: [[1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]], out: 10 },
  { args: [[100, 97, 94, 91, 88, 85, 82, 79, 76, 73, 70, 67, 64, 61, 58, 55, 52, 49, 46, 43]], out: 13 },
  { args: [[41, 33, 29, 33, 35, 26, 47, 24, 18, 28]], out: 5 },
];

tests.forEach((t, i) => {
  let res = minOperations(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});