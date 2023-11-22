/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var findDiagonalOrder = function (nums) {
  const out = [];
  let rows = nums.length;
  let numDiags = rows + Math.max(...nums.map(row => row.length))
  // console.log(numDiags)
  let order = []
  for (let d = 0; d < numDiags; d++) {
    let startCol = d < rows ? 0 : d - rows + 1
    for (let col = startCol; col <= d; col++) {
      let r = d - col
      // console.log({ d, r, col })
      if (nums[r][col] !== undefined) {
        out.push(nums[r][col])
        order.push([r, col])
      }
    }
  }
  console.log({ order })
  return out
};


const { bigtest } = require("./22bigTest")
const tests = [
  { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], out: [1, 4, 2, 7, 5, 3, 8, 6, 9] },
  { args: [[[1, 2, 3, 4, 5], [6, 7], [8], [9, 10, 11], [12, 13, 14, 15, 16]]], out: [1, 6, 2, 8, 7, 3, 9, 4, 12, 10, 5, 13, 11, 14, 15, 16] },
  { args: [[[1, 2, 3, 4, 5], [6, 7], [8], [9, 10, 11], [12, 13, 14, 15, 16], [17]]], out: [1, 6, 2, 8, 7, 3, 9, 4, 12, 10, 5, 17, 13, 11, 14, 15, 16] },
  // { args: [bigtest[0]], out: bigtest[1] },
];

tests.forEach((t, i) => {
  let res = findDiagonalOrder(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});