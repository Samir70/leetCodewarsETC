// obv80ms 76%
var findKthLargest = function(nums, k) {
    nums.sort((a, b) => b - a)
    return nums[k - 1]
};

// 84ms beats 61%
const rndFrom = arr => arr[Math.floor(Math.random()*arr.length)]
var findKthLargest = function(nums, k) {
    let lower = [], equal = [], higher = [];
    let cur = rndFrom(nums)
    for (let n of nums) {
        if (n < cur) {
            lower.push(n)
        } else if (n === cur) {
            equal.push(n)
        } else {
            higher.push(n)
        }
    }
    if (higher.length >= k) {return findKthLargest(higher, k)}
    let atleast = higher.length + equal.length
    // console.log(nums, k, lower, equal, higher)
    return atleast >= k ? cur : findKthLargest(lower, k - atleast)
};