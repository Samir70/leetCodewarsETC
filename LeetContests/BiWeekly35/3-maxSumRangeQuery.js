/**
 * The ith request = [i, j] asks for the sume of nums[i]...nums[j], inclusive
 * Find the max possible sum of all these requests
 * given that any permutation of nums can be used.
 * 
 * both nums and requests can have 100000 elements
 * 
 * give answer mod (10^9 + 7)
 */

// sort requests by start
// instead of merging intervals, split them so we can list how many times each index is requested
/**
 * I was thinking:
 * [[0, 2], [1, 3], [1, 1]]
 * [0, 2] => once each
 * then 
 * [0] => once each
 * [1, 2] => twice each
 * [3] => once each
 * then 
 * [0] => once each
 * [1] => three times
 * [2] => twice each
 * [3] => once each
 * 
 */
// then sort nums
// use the biggest three times, the next biggest twice, and the next two once each
// so with nums = [1, 2, 3, 4, 5, 10]
//effectively: use the permutation [4, 10, 5, 3, 2, 1]

/**
 * Lee215: sweep line
 * count = [1, 0, 0, -1]
 * count = [1, 1, 0, -1] //don't change count[4]
 * count = [1, 2, -1, -1]
 * then count[i] += count[i-1] for i = 1..end
 * 
 * see link to more sweep line problems:
 * https://leetcode.com/problems/maximum-sum-obtained-of-any-permutation/discuss/854206/JavaC%2B%2BPython-Sweep-Line
 */

// 308ms; beats 63%
const maxSumRangeQuery = (nums, requests) => {
    let base = 10 ** 9 + 7;
    let len = nums.length, count = Array(len).fill(0)
    for (let r of requests) {
        count[r[0]]++;
        if (r[1] + 1 < len) { count[r[1] + 1]-- }
    }
    for (let c = 1; c < len; c++) {
        count[c] += count[c - 1]
    }
    console.log(count);
    nums.sort((a, b) => a - b);
    count.sort((a, b) => a - b);
    let maxSum = 0;
    for (let i = 0; i < len; i++) {
        maxSum = (maxSum + count[i] * nums[i]) % base
    }
    return maxSum
};

const tests = [
    { nums: [1, 2, 3, 4, 5], requests: [[1, 3], [0, 1]], out: 19 },
    { nums: [1, 2, 3, 4, 5, 6], requests: [[0, 1]], out: 11 },
    { nums: [1, 2, 3, 4, 5, 10], requests: [[0, 2], [1, 3], [1, 1]], out: 47 }
];

tests.forEach((t, i) => console.log(
    'test', i, maxSumRangeQuery(t.nums, t.requests) === t.out
))

