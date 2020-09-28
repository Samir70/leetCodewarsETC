/**
 * The ith request = [i, j] asks for the sume of nums[i]...nums[j], inclusive
 * Find the max possible sum of all these requests
 * given that any permutation of nums can be used.
 * 
 * both nums and requests can have 100000 elements
 * 
 * give answer mod (10^9 + 7)
 */

const maxSumRangeQuery = (nums, requests) => {
    // sort requests by start
    // instead of merging intervals, split them so we can list how many times each index is requested
    /**
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
};

const tests = [
    { nums: [1, 2, 3, 4, 5], requests: [[1, 3], [0, 1]], out: 19 },
    { nums: [1, 2, 3, 4, 5, 6], requests: [[0, 1]], out: 11 },
    { nums: [1, 2, 3, 4, 5, 10], requests: [[0, 2], [1, 3], [1, 1]], out: 47 }
];

tests.forEach((t, i) => console.log(
    'test', i, maxSumRangeQuery(t.nums, t.requests) === t.out
))

