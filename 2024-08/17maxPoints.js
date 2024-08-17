/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
  let [rows, cols] = [points.length, points[0].length]
  let prevRow = points[0]
  for (let r = 1; r < rows; r++) {
    let leftMax = [prevRow[0]]
    let rightMax = Array(cols).fill(0)
    rightMax[cols - 1] = prevRow[cols - 1]
    for (let c = 1; c < cols; c++) {
      leftMax.push(Math.max(prevRow[c], leftMax[c - 1] - 1))
      rightMax[cols - c - 1] = Math.max(prevRow[cols - c - 1], rightMax[cols - c] - 1)
    }
    let curRow = Array(cols)
    for (let c = 0; c < cols; c++) {
      curRow[c] = points[r][c] + Math.max(leftMax[c], rightMax[c])
    }
    // console.log({ prevRow, leftMax, rightMax, row: points[r], curRow })
    prevRow = [...curRow]
  }
  return Math.max(...prevRow)
};

const tests = [
  { args: [[[1, 2, 3], [1, 5, 1], [3, 1, 1]]], out: 9 },
  { args: [[[1, 5], [2, 3], [4, 2]]], out: 11 },
  { args: [[[5, 2, 1, 2], [2, 1, 5, 2], [5, 5, 5, 0]]], out: 13 },
  { args: [[[8, 2, 4, 4, 9, 3, 5, 3, 10, 10], [4, 8, 7, 4, 0, 1, 10, 6, 4, 0], [0, 5, 2, 10, 4, 2, 7, 8, 6, 8], [0, 1, 1, 2, 8, 0, 5, 9, 8, 2], [6, 2, 0, 4, 5, 0, 5, 3, 10, 3]]], out: 43 },
];

tests.forEach((t, i) => {
  let res = maxPoints(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});