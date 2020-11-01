var find132patternSlow = function (nums) {
    if (nums.length < 3) { return false }
    let smallestSoFar = nums[0];
    let goodRanges = [];
    for (let i = 1; i < nums.length - 1; i++) {
        if (nums[i] <= smallestSoFar) {
            smallestSoFar = nums[i]
        } else {
            goodRanges.push({ index: i, low: smallestSoFar, high: nums[i] })
        }
    }
    // now loook for a suitable third number
    if (goodRanges.length === 0) { return false }
    console.log(goodRanges)
    for (let i = 2; i < nums.length; i++) {
        let curRangeIndex = 0;
        while (curRangeIndex < goodRanges.length && goodRanges[curRangeIndex].index < i) {
            if (nums[i] < goodRanges[curRangeIndex].high && nums[i] > goodRanges[curRangeIndex].low) { return true }
            curRangeIndex++

        }
    }
    return false
};

const find132pattern = nums => {
    if (nums.length < 3) { return false }
    let low = nums[0], high = nums[0];
    let interval = [low, high];
    let i = 1;
    while (i < nums.length && nums[i] <= low) { low = nums[i]; i++ }
    while (i < nums.length) {
        low = Math.min(low, nums[i]);
        high = Math.max(high, nums[i]);
        if (nums[i] > low && nums[i] < high) { 
            console.log('low, high, cur', low, high, nums[i])
            return true 
        }
        i++
    }
    return false
}

const tests = [
    { nums: [1, 2, 3, 4], out: false },
    { nums: [3, 1, 4, 2], out: true },
    { nums: [-1, 3, 2, 0], out: true },
    { nums: [10, 9, 8, 7, 6, 5], out: false },
    { nums: [10, 9, 8, 10, 6, 9], out: true },
    { nums: [1, 0, 1, -4, -3], out: false } //naive graph method fails to this
];

tests.forEach((t, i) => console.log(
    'test', i, find132pattern(t.nums) === t.out
))