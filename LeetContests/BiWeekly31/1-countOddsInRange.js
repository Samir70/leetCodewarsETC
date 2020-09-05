/**
 * counts odds between low and high, inclusive
 * https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/
 */

var countOdds = function(low, high) {
    var left = low % 2 === 1 ? low : low+1;
    var right = high % 2 === 1 ? high : high-1
    return 1 + (right - left)/2
};

// 97% users accepted; 51% submissions
/**
 * lee215
 * def countOdds(self, low, high):
        return (high + 1) / 2 - low / 2
 */