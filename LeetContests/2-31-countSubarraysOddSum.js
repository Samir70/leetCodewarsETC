/**
 * return number of subarrays with odd sum
 * https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum/
 */

var numOfSubarrays = function(arr) {
    var tally = {odd:0, even:0};
    var count = 0;
    var sum = 0;
    for (var n of arr) {
        sum += n;
        if (sum % 2 === 1) {
            count += tally.even + 1
            tally.odd++
        } else {
            count += tally.odd 
            tally.even++
        }
    }
    return count % (10**9 + 7)
};

// 64% users accepted; 24% submissions