/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function (matrix) {
  const getCol = c => matrix.map(r => r[c])
  return matrix[0].map((_, i) => getCol(i))
};

const tests = [
  { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], out: [[1, 4, 7], [2, 5, 8], [3, 6, 9]] },
  { args: [[[1, 2, 3], [4, 5, 6]]], out: [[1, 4], [2, 5], [3, 6]] },
];

tests.forEach((t, i) => {
  let res = transpose(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});