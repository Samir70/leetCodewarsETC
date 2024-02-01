/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[][]}
 */
var divideArray = function (nums, k) {
  const maxDiffIsGood = arr => arr[2] - arr[0] <= k
  nums.sort((a, b) => a - b)
  let out = []
  let group = []
  for (let n of nums) {
    group.push(n)
    if (group.length === 3) {
      if (!maxDiffIsGood(group)) {return []}
      out.push(group)
      group = []
    }
  }
  return out
};

const tests = [
  { args: [[1, 3, 4, 8, 7, 9, 3, 5, 1], 2], out: [[1, 1, 3], [3, 4, 5], [7, 8, 9]] },
  { args: [[1, 3, 3, 2, 7, 3], 3], out: [] },
];

tests.forEach((t, i) => {
  let res = divideArray(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});