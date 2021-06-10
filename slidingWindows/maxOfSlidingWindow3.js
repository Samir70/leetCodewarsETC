// fastest version, beats nearly 79%
var maxSlidingWindow = function(nums, k) {
    if (k === 1) {return nums}
    let stack = [[nums[0], 0]], left = 0;
    let out = []
    for (let i = 1; i < nums.length; i++) {
        while (stack[left][1] < i - k) {left++}
        // console.log(stack, left)
        if (i >= k ) {out.push(stack[left][0])}
        while (stack.length > left && stack[stack.length - 1][0] < nums[i]) {stack.pop()}
        stack.push([nums[i], i])
    }
    while (stack[left][1] < nums.length - k) {left++}
    // console.log(stack, left)
    out.push(stack[left][0])
    return out
};
