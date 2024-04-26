/**
 * @param {number[][]} grid
 * @return {number}
 */
const find2Mins = (arr) => {
  let [minA, minB] = [Infinity, Infinity]
  for (let n of arr) {
    if (n < minA) {
      minB = minA
      minA = n
    } else if (n < minB) {
      minB = n
    }
  }
  return [minA, minB]
}
var minFallingPathSum = function (grid) {
  let rows = grid.length, cols = grid[0].length;
  for (let r = rows - 2; r >= 0; r--) {
    // console.log({ cur: grid[r], next: grid[r + 1] })
    let [a, b] = find2Mins(grid[r + 1])
    for (let c = 0; c < cols; c++) {
      let below = grid[r + 1][c]
      let legalMin = below === a ? b : a
      grid[r][c] += legalMin
    }
    // console.log(grid[r])
  }
  return Math.min(...grid[0])
};

const tests = [
  { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], out: 13 },
  { args: [[[1, 2, 3], [4, 5, 2], [7, 8, 9]]], out: 10 },
  { args: [[[7]]], out: 7 },
];

tests.forEach((t, i) => {
  let res = minFallingPathSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});