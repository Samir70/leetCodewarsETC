/**
 * Landing on step i has cost cost[i];
 * find minimum of reaching the landing
 * 
 * Each cost is non-negative, stepping on top landing is free
 * https://leetcode.com/problems/min-cost-climbing-stairs/
 */

var minCostClimbingStairs = function (cost) {
  let [a, b] = [0, 0]
  let i = cost.length - 1;
  // console.log(cost)
  while (i >= 0) {
    curCost = cost[i] + Math.min(a, b)
    b = a; a = curCost;
    // console.log({i, a, b})
    i--
  }
  return Math.min(a, b)
};

const tests = [
  { args: [[10, 15, 20]], out: 15 },
  { args: [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]], out: 6 },
  { args: [[0, 2, 2, 1]], out: 2 }
];

tests.forEach((t, i) => {
  let res = minCostClimbingStairs(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});

