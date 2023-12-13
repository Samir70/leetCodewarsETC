/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSpecial = function (mat) {
  const rows = mat.length, cols = mat[0].length
  let ones = []
  // console.log(mat)
  let goodCols = new Set()
  for (let r = 0; r < rows; r++) {
    let onesOnThisRow = []
    for (let c = 0; c < cols; c++) {
      if (mat[r][c] === 0) { continue }
      onesOnThisRow.push(c)
      goodCols.add(c)
    }
    ones.push(onesOnThisRow)
  }
  let seenColBefore = new Set()
  // console.log(ones)
  for (let arr of ones) {
    if (arr.length !== 1) {
      for (let c of arr) {
        goodCols.delete(c)
      }
    }
    c = arr[0]
    // console.log({ c, seenColBefore, goodCols })
    seenColBefore.has(c) ? goodCols.delete(c) : seenColBefore.add(c)
  }
  return goodCols.size
};

const tests = [
  { args: [[[1, 0, 0], [0, 0, 1], [1, 0, 0]]], out: 1 },
  { args: [[[1, 0, 0], [1, 0, 0], [1, 0, 0]]], out: 0 },
  { args: [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], out: 3 },
  { args: [[[0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 1, 0, 0, 0], [1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0]]], out: 1 },
];

tests.forEach((t, i) => {
  // if (i !== 3) { return }
  let res = numSpecial(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});