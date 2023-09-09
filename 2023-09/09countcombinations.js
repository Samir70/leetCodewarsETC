/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// recursion with memoisation
// var combinationSum4 = function (nums, target) {
//   let hash = {}
//   const helper = target => {
//     if (hash[target] !== undefined) {return hash[target]}
//     let out = 0
//     for (let n of nums) {
//       if (n > target) {continue}
//       out += n === target ? 1 : helper(target - n)
//     }
//     hash[target] = out
//     return out
//   }
//   return helper(target)
// };
// dp
var combinationSum4 = function (nums, target) {
  let dp = Array(target + 1).fill(0);
  dp[0] = 1;
  for (let miniTarget = 1; miniTarget <= target; miniTarget++) {
    for (let n of nums) {
      if (miniTarget - n < 0) { continue }
      dp[miniTarget] += dp[miniTarget - n]
    }
  }
  return dp[target]
};

const tests = [
  { args: [[1, 2, 3], 4], out: 7 },
  { args: [[9], 3], out: 0 },
  { args: [[7, 6, 5, 8, 10, 45, 13, 75], 75], out: 10245793 },
];

tests.forEach((t, i) => {
  let res = combinationSum4(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});