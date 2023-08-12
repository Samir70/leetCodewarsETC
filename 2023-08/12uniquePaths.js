/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const rows = obstacleGrid.length, cols = obstacleGrid[0].length;
  const dp = []
  for (let r = 0; r < rows; r++) {
    dp.push(Array(cols).fill(0))
  }
  for (let c = 0; c < cols; c++) {
    if (obstacleGrid[0][c] === 1) { break }
    dp[0][c] = 1
  }
  for (let r = 0; r < rows; r++) {
    if (obstacleGrid[r][0] === 1) { break }
    dp[r][0] = 1
  }
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (obstacleGrid[r][c] === 1) { continue }
      dp[r][c] = dp[r][c - 1] + dp[r - 1][c]
    }
  }
  return dp[rows - 1][cols - 1]
};

const tests = [
  { args: [[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], out: 2 },
  { args: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]]], out: 6 },
  { args: [[[0, 1], [0, 0]]], out: 1 },
  { args: [[[0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]]], out: 483 }
];

tests.forEach((t, i) => {
  let res = uniquePathsWithObstacles(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});