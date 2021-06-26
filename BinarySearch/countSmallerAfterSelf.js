// 1993 beats 23%
const findPos = (arr, t) => {
    if (arr.length === 0) {return 0}
    if (arr[0] >= t) {return 0}
    let left = 0, right = arr.length - 1;
    while (right - left > 1) {
        let mid = Math.floor((left + right) / 2)
        if (arr[mid] < t) {
            left = mid
        } else {
            right = mid
        }
    }
    return left === right ? left : right
}

var countSmaller = function(nums) {
    const n = nums.length
    let out = Array(n);
    let sorted = [];
    
    for (let i = n - 1; i >= 0; i--) {
        if (sorted[sorted.length -1] < nums[i]) {
            out[i] = sorted.length;
            sorted.push(nums[i]);
            continue
        }
        let p = findPos(sorted, nums[i])
        sorted.splice(p, 0, nums[i])
        // console.log('i:', i,  nums[i], p, sorted)
        out[i] = p
    }
    return out
};