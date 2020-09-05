/**
 * Given target array of positive integers, find min number of operations to change
 * zero array of same length into target. 
 * You can add one to every element of a subarray in each operation
 * https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array/
 */

var minNumberOperations = function(target) {
    var steps = target[0];
    for (var i = 1; i<target.length; i++) {
        if (target[i] > target[i-1]) {
            steps += target[i] - target[i-1]
        }
    }
    return steps
};

// Some tried segment trees, but got TLE
// 62% users accepted; 37% of submissions