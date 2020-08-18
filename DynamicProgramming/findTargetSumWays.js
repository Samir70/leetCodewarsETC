// As an simple example, for the following array: [1, 1] 
// we would have the following sums on each step:

//     { 0: 1 } // initial
//     { 1: 1, -1: 1 }
//     { 2: 1, 0: 2, -2: 1 }

/*
var findTargetSumWays = function(nums, S) {
  let sums = new Map([[0, 1]]);
  
  for (let num of nums) {
    const next = new Map();
    
    for (let [sum, amount] of sums) {
      const plus = sum + num;
      const minus = sum - num;

      next.set(plus, next.has(plus) ? next.get(plus) + amount : amount);
      next.set(minus, next.has(minus) ? next.get(minus) + amount : amount);
    }
    
    sums = next;
  }
  
  return sums.has(S) ? sums.get(S) : 0;
};
*/


var memo = {}
var findTargetSumWays = function (nums, s) {
    let token = nums.join(',') + '->' + s;
    if (memo[token] !== undefined) { return memo[token] }
    console.log('looking for', s, 'in', nums)
    if (nums.length === 1) {
        if (s===0 && nums[0] === 0) {return 2}
        return nums[0] === s || nums[0] === -s ? 1 : 0
    }
    let smaller = nums.slice(0, -1), last = nums[nums.length - 1];
    memo[token] = findTargetSumWays(smaller, s + last) + findTargetSumWays(smaller, s - last);
    console.log(token, '->', memo[token])
    return memo[token]
};

const tests = [
    // { nums: [1, 1, 1, 1, 1], s: 3, out: 5 },
    // { nums: [1, 1, 1, 1], s: 2, out: 4 },
    // { nums: [2, 3, 1, 4, 5], s: 1, out: 3 },
    { nums: [0, 0, 0, 0, 0, 0, 0, 0, 1], s: 1, out: 256 }
];

tests.forEach((t, i) => console.log(
    'tests', i, findTargetSumWays(t.nums, t.s), 'should be', t.out
))