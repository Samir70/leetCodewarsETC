/**
 * @param {number[][]} grid
 * @return {number}
 */
var numMagicSquaresInside = function (grid) {
  let [rows, cols] = [grid.length, grid[0].length]
  const showGrid = (r, c) => {
    console.log(grid[r - 1].slice(c - 1, c + 2))
    console.log(grid[r].slice(c - 1, c + 2))
    console.log(grid[r + 1].slice(c - 1, c + 2))
    console.log("========")
  }
  const isMagic = (r, c) => {
    if (grid[r][c] !== 5) { return false }
    // four lines through middle
    if (grid[r][c - 1] + grid[r][c + 1] !== 10) { return false }
    if (grid[r - 1][c - 1] + grid[r + 1][c + 1] !== 10) { return false }
    if (grid[r - 1][c] + grid[r + 1][c] !== 10) { return false }
    if (grid[r - 1][c + 1] + grid[r + 1][c - 1] !== 10) { return false }
    // top, bottom
    if (grid[r - 1][c - 1] + grid[r - 1][c] + grid[r - 1][c + 1] !== 15) { return false }
    if (grid[r + 1][c - 1] + grid[r + 1][c] + grid[r + 1][c + 1] !== 15) { return false }
    // left, right
    if (grid[r - 1][c - 1] + grid[r][c - 1] + grid[r + 1][c - 1] !== 15) { return false }
    if (grid[r - 1][c + 1] + grid[r][c + 1] + grid[r + 1][c + 1] !== 15) { return false }
    // uniqueness
    let nums = new Set()
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (grid[r + i][c + j] < 1 || grid[r + i][c + j] > 9) { return false }
        nums.add(grid[r + i][c + j])
      }
    }
    if (nums.size !== 9) { return false }
    // showGrid(r, c)
    return true
  }
  let count = 0
  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      if (isMagic(r, c)) { count++ }
    }
  }
  return count
};

/**
 * Define a helper function isMagicSquare(grid, row, col) that determines if the subarray of grid starting at index (row, col) is a magic square:

    Initialize the magic sequence sequence to 2943816729438167.
    Also initialize the reversed sequence reversedSequence to 7618349276183492 
      to account for the opposite direction.
    Initialize a string S.
    Starting from the first element grid[row][col], 
      append all bordering elements in clockwise order to S.
    If S is contained in either sequence or reversedSequence, 
      the first element is even, 
      and the middle element is 5, 
      then the subarray is a magic square so return true
    Otherwise, return false
    NB: requires constraint that grid[r][c] <= 15
      eg: 2 94 3 8 1 6 7 2
 */

const tests = [
  { args: [[[4, 3, 8, 4], [9, 5, 1, 9], [2, 7, 6, 2]]], out: 1 },
  { args: [[[4, 3, 8], [9, 5, 1], [2, 7, 6]]], out: 1 },
  {
    args: [[
      [5, 4, 9, 4],
      [10, 6, 2, 9],
      [3, 8, 7, 2]]], out: 0
  },
  { args: [[[8]]], out: 0 },
  { args: [[[5, 5, 5], [5, 5, 5], [5, 5, 5]]], out: 0 },
  {
    args: [[
      [9, 9, 5, 1, 9, 5, 5, 7, 2, 5],
      [9, 1, 8, 3, 4, 6, 7, 2, 8, 9],
      [4, 1, 1, 5, 9, 1, 5, 9, 6, 4],
      [5, 5, 6, 7, 2, 8, 3, 4, 0, 6],
      [1, 9, 1, 8, 3, 1, 4, 2, 9, 4],
      [2, 8, 6, 4, 2, 7, 3, 2, 7, 6],
      [9, 2, 5, 0, 7, 8, 2, 9, 5, 1],
      [2, 1, 4, 4, 7, 6, 2, 4, 3, 8],
      [1, 2, 5, 3, 0, 5, 10, 8, 5, 2],
      [6, 9, 6, 8, 8, 4, 3, 6, 0, 9]]], out: 3
  },
];

tests.forEach((t, i) => {
  let res = numMagicSquaresInside(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});