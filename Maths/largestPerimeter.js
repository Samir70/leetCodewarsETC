var largestPerimeter = function(nums) {
    nums.sort((a, b) => b - a)
    let [a, b] = nums
    for (let c of nums.slice(2)) {
        if (a < b + c) {return a+b+c}
        a = b; b = c
    }
    return 0
};