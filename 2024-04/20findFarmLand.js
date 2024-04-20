/**
 * @param {number[][]} land
 * @return {number[][]}
 */
var findFarmland = function (land) {
  const out = [], rows = land.length, cols = land[0].length
  let counted = new Set()
  const key = (a, b) => [a, b].join(',');
  const findOtherCorner = (r, c) => {
    let rightLim = cols;
    let bottomR = r, bottomC = c;
    for (let i = r; i < rows; i++) {
      for (let j = c; j < rightLim; j++) {
        if (land[i][j] === 0) { rightLim = j; continue }
        bottomC = Math.max(bottomC, j)
        bottomR = Math.max(bottomR, i)
        counted.add(key(i, j));
      }
    }
    // console.log({r, c, counted, bottomR, bottomC})
    out.push([r, c, bottomR, bottomC])
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // console.log({key:key(r, c), counted})
      if (land[r][c] === 0 || counted.has(key(r, c))) { continue }
      findOtherCorner(r, c)
    }
  }
  return out
};

const tests = [
  { args: [[[1, 0, 0], [0, 1, 1], [0, 1, 1]]], out: [[0, 0, 0, 0], [1, 1, 2, 2]] },
  { args: [[[1, 1], [1, 1]]], out: [[0, 0, 1, 1]] },
  { args: [[[0]]], out: [] },
]