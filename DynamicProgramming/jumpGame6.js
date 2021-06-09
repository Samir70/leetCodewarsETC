// https://leetcode.com/problems/jump-game-vi/
// dequeue, sliding window maximum, dp

// getss the dp idea, but TLEs when k = 16000ish
var maxResult = function(nums, k) {
    /*
    [10,-5,-2,4,0,3]
    best scores
    10
    10, -5+10 = 10, 5
    10, 5, 8
    10, 5, 8, 14, 
    10, 5, 8, 14, 14, 
    10, 5, 8, 14, 14, 17
    */
    let best = [nums[0]]
    for (let i = 1; i < nums.length; i++) {
        let left = i < k ? 0 : i - k
        let max = Math.max(...best.slice(left, left+k))
        best.push(nums[i] + max)
    }
    return best[best.length - 1]
};

// improves, but TLE when k = 94000ish
var maxResult = function(nums, k) {
    let best = [nums[0]]
    for (let i = 1; i < nums.length; i++) {
        let left = i < k ? 0 : i - k
        let max = -Infinity
        for (let j = left; j < left+k; j++) {
            if (best[j] > max) {max = best[j]}
        }
        // let max = Math.max(...best.slice(left, left+k))
        best.push(nums[i] + max)
    }
    return best[best.length - 1]
};

// beats 40%
var maxResult = function(nums, k) {
    let best = [nums[0]], stack = [[nums[0], 0]], pos = 0;
    for (let i = 1; i < nums.length; i++) {
        let left = i < k ? 0 : i - k
        while (pos < stack.length - 1 && stack[pos][1] < left) {pos++}
        best.push(nums[i] + stack[pos][0])
        while (stack.length > pos && stack[stack.length - 1][0] < best[i]) {stack.pop()}
        stack.push([best[i], i])
        // console.log(best,stack)
    }
    return best[best.length - 1]
};

