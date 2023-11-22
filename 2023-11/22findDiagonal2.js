/**
 * @param {number[][]} nums
 * @return {number[]}
 */
// sorting
// var findDiagonalOrder = function (nums) {
//   let coords = [];
//   for (let r = 0; r < nums.length; r++) {
//     for (let c = 0; c < nums[r].length; c++) {
//       coords.push([r + c, r, c])
//     }
//   }
//   coords.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0])
//   // console.log(coords)
//   const out = [];
//   for (let [d, r, c] of coords) {
//     out.push(nums[r][c])
//   }
//   return out
// };
// BFS
var findDiagonalOrder = function (nums) {
  let out = []
  let stack = [[0, 0]], curDiag = 0;
  while (stack.length) {
    // console.log({ stack })
    let newStack = [], i = 0;
    while (i < stack.length) {
      let [r, c] = stack[i++]
      out.push(nums[r][c])
      if (nums[r + 1] !== undefined && r + 1 > curDiag) {
        newStack.push([r + 1, 0])
        curDiag++
      }
      if (nums[r][c + 1] !== undefined) {
        newStack.push([r, c + 1])
      }
    }
    stack = [...newStack]
  }
  return out
};


const { bigtest } = require("./22bigTest")
const tests = [
  { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], out: [1, 4, 2, 7, 5, 3, 8, 6, 9] },
  { args: [[[1, 2, 3, 4, 5], [6, 7], [8], [9, 10, 11], [12, 13, 14, 15, 16]]], out: [1, 6, 2, 8, 7, 3, 9, 4, 12, 10, 5, 13, 11, 14, 15, 16] },
  { args: [[[1, 2, 3, 4, 5], [6, 7], [8], [9, 10, 11], [12, 13, 14, 15, 16], [17]]], out: [1, 6, 2, 8, 7, 3, 9, 4, 12, 10, 5, 17, 13, 11, 14, 15, 16] },
  { args: [bigtest[0]], out: bigtest[1] },
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