/**
 * @param {number[][]} grid
 * @return {number}
 */
let base = 10 ** 9 + 7;
var countPaths = function (grid) {
  let rows = grid.length;
  let cols = grid[0].length;
  let hash = []
  for (let r = 0; r < rows; r++) {
    let row = Array(cols).fill(null)
    hash.push(row)
  }
  const makePaths = (r, c) => {
    if (hash[r][c] !== null) { return hash[r][c] }
    // console.log(`finding hash(${r}, ${c})`)
    let neighbours = [
      [1, 0], [-1, 0], [0, -1], [0, 1]
    ].map(p => [p[0] + r, p[1] + c])
    hash[r][c] = 1;
    // console.log(`found point(${r}, ${c}) has neighbours ${neighbours}, current val: ${hash[r][c]}`)
    for (let [i, j] of neighbours) {
      if (i < 0 || i >= rows || j < 0 || j >= cols) { continue }
      if (grid[i][j] <= grid[r][c]) { continue }
      // console.log(`checking neighbour (${i}, ${j})`)
      hash[r][c] += makePaths(i, j)
      hash[r][c] = hash[r][c] % base;
    }
    // console.log(`found hash(${r}, ${c}) = ${hash[r][c]}`)
    return hash[r][c]
  }
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (hash[r][c] === null) {
        hash[r][c] = makePaths(r, c)
      }
      count += hash[r][c]
      count = count % base;
    }
  }
  // console.log(hash)
  return count
};

const tests = [
  { args: [[[1, 1], [3, 4]]], out: 8 },
  { args: [[[1], [2]]], out: 3 },
  { args: [[[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [6, 7, 8, 1, 3], [8, 10, 9, 8, 7]]], out: 215 }
];

tests.forEach((t, i) => {
  let res = countPaths(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});