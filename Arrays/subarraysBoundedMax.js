// my version
// 88ms beats 60%
var numSubarrayBoundedMax = function(nums, left, right) {
    const isGood = i => nums[i] >= left && nums[i] <= right;
    
    // store indices of elements that are out of bounds
    let tooHigh = [nums.length], tooLow = [-1], nextGood = [nums.length];
    for (let i = nums.length-1; i >= 0; i--) {
        if (nums[i] < left) {tooLow.push(i)}
        if (nums[i] > right) {tooHigh.push(i)}
        if (nums[i] >= left && nums[i] <= right) {nextGood.push(i)}
    }
    
    // index of the next element that is too high or too low or good
    let tH = -1, tL = Infinity, nG = -1;
    // for each index i, 
    // find the min and max size of subarray starting at i that works
    // And so work out how many subarrays start at i, keep running total
    let out = 0
    // console.log(tooHigh, tooLow, nextGood)
    for (let i = 0; i < nums.length; i++) {
        if (nG < i) {nG = nextGood.pop()}
        if (tH < i) {tH = tooHigh.pop()}
        if (tL > i) {tL = tooLow.pop()}
        let max = tH - i, min = isGood(i) ? 1 : nG - i + 1
        let subsStartingAtI = min > max ? 0 : max - min + 1
        // console.log(nums[i], nG, tL, tH, max, min)
        out += subsStartingAtI
    }
    return out
};



// via sgallivan https://leetcode.com/discuss/explore/june-leetcoding-challenge-2021/1278431/Number-of-Subarrays-with-Bounded-Maximum-or-JS-Python-Java-C%2B%2B-or-Easy-Triang.-Number-Sol.-w-Expl.
// 80ms beats 92%
const tri = n => n * (n + 1) / 2
var numSubarrayBoundedMax = function(nums, left, right) {
    let out = 0, mid = 0, low = 0;
    for (let n of nums) {
        if (n > right) {
            out += tri(mid)
            mid = 0
        } else {
            mid++
        }
        if (n < left) {
            low++
        } else {
            out -= tri(low)
            low = 0
        }
        // console.log(n, out, 'mid, low', mid, low)
    }
    out += tri(mid) - tri(low)
    return out
};
