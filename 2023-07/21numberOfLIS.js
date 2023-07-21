/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
  let n = nums.length;
  let length = Array(n).fill(1), count = Array(n).fill(1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        if (length[j] + 1 > length[i]) {
          length[i] = length[j] + 1;
          count[i] = 0
        }
        if (length[j] + 1 === length[i]) {
          count[i] += count[j]
        }
      }
    }
  }
  let maxLen = Math.max(...length), out = 0;
  console.log({length, count})
  for (let i = 0; i < n; i++) {
    if (length[i] === maxLen) {out += count[i]}
  }
  return out
};

const tests = [
  { args: [[1, 3, 5, 4, 7]], out: 2 },
  { args: [[1, 3]], out: 1 },
  { args: [[2, 2, 2, 2, 2]], out: 5 },
  { args: [[3,5,6,7,3,4,5,8,9,1,23,34,14,2,44,55]], out: 1 },
];

tests.forEach((t, i) => {
  let res = findNumberOfLIS(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});