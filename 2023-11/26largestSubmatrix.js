/**
 * @param {number[][]} matrix
 * @return {number}
 */
var largestSubmatrix = function (matrix) {
  let rows = matrix.length, cols = matrix[0].length;
  let onesEndingAt = []
  for (let r = 0; r < rows; r++) {
    onesEndingAt.push(Array(cols).fill(0))
  }
  for (let c = 0; c < cols; c++) {
    let oneCount = 0;
    for (let r = 0; r < rows; r++) {
      matrix[r][c] === 1 ? oneCount++ : oneCount = 0
      onesEndingAt[r][c] = oneCount
    }
  }
  let maxArea = 0;
  for (let r = 0; r < rows; r++) {
    let row = onesEndingAt[r].sort((a, b) => b - a)
    let i = 0, minColHeight = Infinity, width = 1;
    while (i < cols) {
      if (row[i] === 0) {
        i++;
        minColHeight = Infinity;
        width = 1
        continue
      }
      minColHeight = Math.min(minColHeight, row[i])
      maxArea = Math.max(maxArea, minColHeight * width)
      i++; width++
    }
  }
  // console.log(onesEndingAt)
  return maxArea
};

const tests = [
  { args: [[[0, 0, 1], [1, 1, 1], [1, 0, 1]]], out: 4 },
  { args: [[[1, 0, 1, 0, 1]]], out: 3 },
  { args: [[[1, 1, 0], [1, 0, 1]]], out: 2 },
  { args: [[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1], [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]]], out: 34 },
];

tests.forEach((t, i) => {
  // if (i !== 3) { return }
  let res = largestSubmatrix(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});