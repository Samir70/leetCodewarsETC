// https://leetcode.com/problems/3sum-closest/
// 248ms beats 7%

const oneSumClosest = (nums, target) => {
    let left = 0, right = nums.length - 1;
    // find first element that is bigger than target (or find the last element)
    while (left < right) {
        let mid = Math.floor((left+right) / 2)
        if (nums[mid] < target) {
            left = mid + 1
        } else {
            right = mid
        }
    }
    if (left > 0 && Math.abs(nums[left - 1] - target) < Math.abs(nums[left] - target)) {left--}
    return left
}

var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b)
    let bestDiff = Infinity, bestAns = Infinity;
    for (let a = 0; a < nums.length - 1; a++) {
        for (let b = a+1; b < nums.length; b++) {
            let stillNeed = target - nums[a] - nums[b]
            let c = oneSumClosest(nums, stillNeed)
            if (c === a || c === b) {continue}
            stillNeed -= nums[c];
            if (Math.abs(stillNeed) < bestDiff) {
                console.log('found', [a, b, c].map(i => nums[i]))
                bestDiff = Math.abs(stillNeed)
                bestAns = target - stillNeed
            }
            
        }
    }
    return bestAns
};