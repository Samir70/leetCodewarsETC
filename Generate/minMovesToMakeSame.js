var minMoves2 = function(nums) {
    nums.sort((a, b) => a - b);
    let median 
    if (nums.length % 2) {
        median = nums[(nums.length - 1) / 2]
    } else {
        let mid = nums.length / 2
        let left = nums[mid - 1], right = nums[mid]
        median = left === right ? left : left + 1
    }
    let sum = 0
    for (let n of nums) {
        sum += Math.abs(median - n)
    }
    return sum
 };

 