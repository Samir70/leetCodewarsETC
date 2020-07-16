/**
 * a) make an array of cumulative sums, hash these as you go
 * b) use that to find if there is a subarray with required sum ending at i
 * c) keep track of the shortest found so far. 
 *    List these values as you go
 *    see if there was a subarray that ended before this one began
 *    it is a possible answer
 * d) find the best possible answer.
 */

// timed out on absolutely huge array
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

const { tests } = require('./twoSmallestNO_tests')
tests.forEach((t, i) => console.log('test i', minSumOfLengths(t.nums, t.target), 'should be', t.out))