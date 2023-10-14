/**
 * @param {number[]} cost
 * @param {number[]} time
 * @return {number}
 */
var paintWalls = function (cost, time) {
  let n = cost.length;
  let hash = {}
  const dp = (i, wallsLeftToPaint) => {
    if (wallsLeftToPaint <= 0) { return 0 }
    if (i >= n) { return Infinity }
    let key = [i, wallsLeftToPaint].join(",");
    if (hash[key] !== undefined) { return hash[key] }
    let costPayForThisWall = cost[i] + dp(i + 1, wallsLeftToPaint - 1 - time[i]);
    let costSkipThisWall = dp(i + 1, wallsLeftToPaint);
    let bestCost = Math.min(costPayForThisWall, costSkipThisWall)
    hash[key] = bestCost
    return bestCost
  }
  return dp(0, n)
};

const bigTest = Array(500).fill(1);
const tests = [
  { args: [[1, 2, 3, 2], [1, 2, 3, 2]], out: 3 },
  { args: [[2, 3, 4, 2], [1, 1, 1, 1]], out: 4 },
  { args: [[1, 2, 3, 2, 4, 7, 1, 1, 1, 1, 1, 5, 7, 8, 2, 2, 2, 2, 2, 2, 1, 5, 4], [1, 2, 3, 2, 3, 5, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 4, 2, 5, 4, 3]], out: 7 },
  { args: [[1, 2, 3, 2, 4, 7, 1, 1, 1, 1, 1, 5, 7, 8, 2, 2, 2, 2, 2, 2, 1, 5, 4], [1, 2, 3, 2, 3, 5, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 4, 2, 5, 15, 3]], out: 7 },
  { args: [[1, 2, 3, 2, 4, 7, 1, 1, 1, 1, 1, 5, 7, 8, 2, 2, 2, 2, 2, 2, 1, 5, 4], [1, 2, 3, 2, 3, 5, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 4, 2, 5, 16, 3]], out: 6 },
  { args: [[1, 2, 3, 2, 4, 7, 1, 1, 1, 1, 1, 5, 7, 8, 2, 2, 2, 2, 2, 2, 1, 5, 4], [1, 2, 3, 2, 3, 5, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 4, 2, 5, 21, 3]], out: 6 },
  { args: [[1, 2, 3, 2, 4, 7, 1, 1, 1, 1, 1, 5, 7, 8, 2, 2, 2, 2, 2, 2, 1, 5, 4], [1, 2, 3, 2, 3, 5, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 4, 2, 5, 41, 3]], out: 5 },
  { args: [[1, 2, 3, 2, 4, 7, 1, 1, 1, 1, 1, 5, 7, 8, 2, 2, 2, 2, 2, 2, 1, 5, 4], [1, 29, 3, 2, 3, 5, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 4, 2, 5, 4, 3]], out: 2 },
  { args: [bigTest, bigTest], out: 250 } // too big, will take too long
];

tests.forEach((t, i) => {
  let res = paintWalls(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});