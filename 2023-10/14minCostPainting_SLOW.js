/**
 * @param {number[]} cost
 * @param {number[]} time
 * @return {number}
 */
var paintWalls = function (cost, time) {
  let n = cost.length;
  let costTime = [];
  for (let i = 0; i < n; i++) {
    costTime.push([cost[i], time[i]])
  }
  costTime.sort((a, b) => b[1] - a[1]);
  costTime.sort((a, b) => a[0] - b[0]);
  // console.log(costTime)

  let hash = {}
  let wallIsPainted = Array(n).fill(0)
  const finishPainting = (painted, numberOfWallsLeft) => {
    if (numberOfWallsLeft <= 0) { return 0 }
    let key = [...painted, numberOfWallsLeft].join(",")
    if (hash[key] !== undefined) { return hash[key] }
    let minCost = Infinity;
    for (let i = 0; i < numberOfWallsLeft; i++) {
      if (painted[i]) { continue }
      let [c, t] = costTime[i];
      painted[i] = 1;
      let costOfCur = c + finishPainting(painted, numberOfWallsLeft - 1 - t)
      minCost = Math.min(minCost, costOfCur);
      painted[i] = 0;
    }
    hash[key] = minCost;
    return minCost
  }

  let minCost = Infinity;
  for (let i = 0; i < n; i++) {
    let [c, t] = costTime[i];
    wallIsPainted[i] = 1
    let costOfCur = c + finishPainting(wallIsPainted, n - 1 - t)
    minCost = Math.min(minCost, costOfCur)
    wallIsPainted[i] = 0
  }
  return minCost
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
  // { args: [bigTest, bigTest], out: 6 } // too big, will take too long
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