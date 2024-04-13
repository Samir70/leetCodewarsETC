/**
 * @param {character[][]} matrix
 * @return {number}
 */
const rowArea = row => {
  row = row.map(Number)
  for (let i = 1; i < row.length; i++) {
    row[i] = row[i] === 0 ? 0 : row[i] + row[i - 1]
  }
  return row
}
var maximalRectangle = function (matrix) {
  matrix = matrix.map(rowArea)
  // console.log(matrix)
  // now find max area of rectangle having (r, c) as bottom right corner
  let maxA = 0;
  for (let c = 0; c < matrix[0].length; c++) {
    for (let r = 0; r < matrix.length; r++) {
      let width = matrix[r][c]
      if (width === 0) { continue }
      for (let top = r; top >= 0; top--) {
        width = Math.min(width, matrix[top][c])
        if (width === 0) { break }
        let height = r - top + 1
        maxA = Math.max(maxA, width * height)
      }
    }
  }
  // convert to areas
  return maxA
};

const tests = [
  {
    args: [[
      ["1", "0", "1", "0", "0"],
      ["1", "0", "1", "1", "1"],
      ["1", "1", "1", "1", "1"],
      ["1", "0", "0", "1", "0"],
    ]], out: 6
  },
  {
    args: [[
      ["1", "0", "1", "0", "0"],
      ["1", "0", "1", "1", "1"],
      ["1", "1", "1", "1", "1"],
      ["1", "0", "0", "1", "0"],
      ["1", "1", "1", "1", "1"],
      ["0", "1", "1", "1", "1"],
    ]], out: 8
  },
  { args: [[["0"]]], out: 0 },
  { args: [[["1"]]], out: 1 },
  { args: [[["1", "1"]]], out: 2 },
  { args: [[["0", "0", "1"], ["1", "1", "1"]]], out: 3 },
  { args: [[["0", "0", "1"], ["1", "1", "1"], ["0", "0", "1"], ["0", "0", "1"]]], out: 4 },
  { args: [[["0", "0", "1"], ["1", "1", "1"], ["0", "1", "1"]]], out: 4 },
];

tests.forEach((t, i) => {
  let res = maximalRectangle(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});