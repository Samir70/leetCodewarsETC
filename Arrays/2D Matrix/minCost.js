/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
// var minCost = function (nums, cost) {
//   let n = nums.length;
//   let minCost = Infinity;
//   for (let i = 0; i < n; i++) {
//     let costMatchI = 0
//     for (let j = 0; j < n; j++) {
//       let diff = Math.abs(nums[i] - nums[j])
//       costMatchI += diff * cost[j]
//     }
//     // console.log({i, costMatchI});
//     if (costMatchI < minCost) {minCost = costMatchI}
//   }
//   return minCost
// };
var minCost = function (nums, cost) {
  let n = nums.length;
  let valCosts = []
  for (let i = 0; i < n; i++) {
    valCosts.push([nums[i], cost[i]])
  }
  valCosts = valCosts.sort((a, b) => a[0] - b[0])
  // riase to the highest
  let upCosts = [0], costSoFar = 0;
  let [val, opCost] = valCosts[0];
  for (let i = 1; i < n; i++) {
    let diff = valCosts[i][0] - val
    costSoFar += diff * opCost
    upCosts.push(costSoFar)
    // console.log({opCost, val, upCosts, i})
    opCost += valCosts[i][1]
    val = valCosts[i][0]
  }
  // lower to the lowest
  let downCosts = [0];
  costSoFar = 0;
  [val, opCost] = valCosts[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    let diff = val - valCosts[i][0]
    costSoFar += diff * opCost
    downCosts.push(costSoFar)
    // console.log({opCost, val, downCosts, i})
    opCost += valCosts[i][1]
    val = valCosts[i][0]
  }
  downCosts.reverse()
  // console.log({valCosts, upCosts, downCosts})
  let minCost = Infinity;
  for (let i = 0; i < n; i++) {
    minCost = Math.min(minCost, upCosts[i] + downCosts[i])
  }
  return minCost
};



const tests = [
  { args: [[1, 3, 5, 2], [2, 3, 1, 14]], out: 8 },
  { args: [[2, 2, 2, 2, 2], [4, 2, 8, 1, 3]], out: 0 }
];

tests.forEach((t, i) => {
  let res = minCost(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});