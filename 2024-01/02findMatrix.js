/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findMatrix = function (nums) {
  let matrix = []
  let rowToUse = Array(nums.length + 1).fill(0)
  for (let n of nums) {
    let r = rowToUse[n]
    while (matrix[r] === undefined) {
      matrix.push([])
    }
    matrix[r].push(n)
    rowToUse[n]++
  }
  return matrix
};

const tests = [
  { args: [[1, 3, 4, 1, 2, 3, 1]], out: [[1, 3, 4, 2], [1, 3], [1]] },
  { args: [[2, 1, 1]], out: [ [ 2, 1 ], [ 1 ] ] },
];

tests.forEach((t, i) => {
  let res = findMatrix(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});