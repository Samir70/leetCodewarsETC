// correct answer, but out of heap overflow
let memo = {}
var xorGameSlow = function (nums, xorOfAll) {
    if (xorOfAll === undefined) {
        xorOfAll = 0;
        for (let n of nums) { xorOfAll ^= n }
    }
    if (xorOfAll === 0) { return true }
    let key = nums.join(',');
    if (memo[key] !== undefined) { return memo[key] }
    let bestOutcome = false;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0) { continue }
        let newXor = xorOfAll ^ nums[i];
        let temp = nums[i]
        nums[i] = -1
        bestOutcome = bestOutcome || !xorGame(nums, newXor)
        nums[i] = temp
    }
    memo[key] = bestOutcome
    return bestOutcome
};

// 124ms -- too few submissions in js
var xorGame = function(nums) {
    // tally the nums
    // count how many came up an odd number of times.
    let tally = {}, count = 0, xorOfAll = 0;
    for (let n of nums) {
        tally[n] = (tally[n] || 0) + 1
        count += tally[n] % 2 ? 1 : -1
        xorOfAll ^= n
    }
    console.log(tally, count, xorOfAll)
    return (count % 2 === 0) || (xorOfAll === 0)
};

const tests = [
    { nums: [1, 1, 2], out: false },
    { nums: [3, 6, 5, 4, 0, 9, 78, 6], out: true }
];

tests.forEach((t, i) => console.log(
    'test', i, xorGame(t.nums) === t.out
))