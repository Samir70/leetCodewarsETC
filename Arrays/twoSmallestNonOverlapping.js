/**
 * https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/
 * a) make an array of cumulative sums, hash these as you go
 * b) use that to find if there is a subarray with required sum ending at i
 * c) keep track of the shortest found so far. 
 *    List these values as you go
 *    see if there was a subarray that ended before this one began
 *    it is a possible answer
 * d) find the best possible answer.
 */

// timed out on absolutely huge array, 392ms accepted
const minSumOfLengths = (nums, target) => {
    var total = 0;
    var hash = {0:-1}
    var shortestSoFar = Infinity;
    var shortestList = [];
    var bestAnswer = Infinity;
    var i = 0;
    while (i < nums.length) {
        total += nums[i];
        hash[total] = i;
        var needToTake = total - target;
        if (hash[needToTake]) {
            var len = i - hash[needToTake]
            if (len < shortestSoFar) {shortestSoFar = len}
            var other = i > 0 ? shortestList[hash[needToTake]] : Infinity
            var posAns = other + len;
            if (posAns < bestAnswer) {bestAnswer = posAns}
        }
        shortestList.push(shortestSoFar)
        // console.log(shortestList)
        i++;
    }
    return bestAnswer === Infinity ? -1 : bestAnswer
}

// 108ms
const minSumOfLengths = (nums, target) => {
    let left = 0, right = 0, total = 0;
    let shortestBeforeIdx = [];
    let bestAnswer = Infinity, shortestSoFar = Infinity;
    while (right < nums.length) {
        total += nums[right]
        while (total > target) {total -= nums[left++]}
        if (total === target) {
            let len = right - left + 1;
            if (len < shortestSoFar) {shortestSoFar = len}
            if (left > 0) {bestAnswer = Math.min(bestAnswer, shortestBeforeIdx[left - 1] + len)}
        }
        shortestBeforeIdx.push(shortestSoFar);
        right++
    }
    return bestAnswer === Infinity ? -1 : bestAnswer
}

const { tests } = require('./twoSmallestNO_tests')
tests.forEach((t, i) => console.log('test i', minSumOfLengths(t.nums, t.target), 'should be', t.out))