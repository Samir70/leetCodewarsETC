// can flip k zeros
// https://leetcode.com/problems/max-consecutive-ones-iii/
// 88ms beats 77%
const longestOnes = (nums, k) => {
    // left points to next zero to be put back as zero
    // right points to next element to be considered
    let left = 0, right = 0, oneCount = 0, zeroCount = 0;
    while (nums[right] === 1) {
        oneCount++; right++
    }
    let max = oneCount;
    while (right < nums.length) {
        if (nums[right] === 0) {
            zeroCount++;
            if (zeroCount > k) {
                while (nums[left] === 1) {left++; oneCount--}
                left++; zeroCount--;
            }
        } else {
            oneCount++
        }
        if (oneCount + zeroCount > max) {max = oneCount + zeroCount}
        // console.log('found:', nums[right], [left, right], [oneCount, zeroCount], max)
        right++;
    }
    return max
}

/**
 * list of sim qs
 * https://leetcode.com/problems/max-consecutive-ones-iii/discuss/247564/JavaC%2B%2BPython-Sliding-Window
 */

const tests = [
    { nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k: 2, out: 6 },
    { nums: [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k: 3, out: 10 }
]

tests.forEach((t, i) => console.log(
    'test', i, longestOnes(t.nums, t.k) === t.out
))