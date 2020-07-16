/**
 * two pointers doesn't help for this the way it does for 
 * substring with out repeated character
 * 2P works when it reduces the search space
 * Here it is naive to think we can make a valid reduction of the search space
 * as illustrated by the -ve numbers in below examples
 * To increase the total, when is it better to right++ or left++?
 * either
    If a wider scope of the sliding window is valid, narrowing it should maintain validity
    If a narrower scope of the sliding window is invalid, widening it should maintain invalidity
    but with target 3
    1, 1, 1 valid, but 1, 1 not valid
    4, 1 invalid but 4, 1, -2 is valid
 */

var subarraySum = function (nums, k) {
    if (nums.length === 0) { return 0 }
    var total = 0;
    var sums = [0];
    var ways = 0;
    for (var i = 0; i < nums.length; i++) {
        total += nums[i];
        sums.push(total)
    }
    for (var i = 0; i < sums.length; i++) {
        var left = sums[i];
        for (var j = i + 1; j < sums.length; j++) {
            if (sums[j] - sums[i] === k) { ways++ }
        }
    }
    return ways
}

/**
 * Can be done without the sums array
 * public class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0;
        for (int start = 0; start < nums.length; start++) {
            int sum=0;
            for (int end = start; end < nums.length; end++) {
                sum+=nums[end];
                if (sum == k)
                    count++;
            }
        }
        return count;
    }
}
 */

// also: use map, sim to finding pairs of numbers that sum to a target. 

const tests = [
    { nums: [-1, -1, 1], k: 0, out: 1 },
    { nums: [1, 1, 1, 6, 5, 4, 3, 7, 8, 9, 3, 2, 2, 4, 5], k: 9, out: 4 },
    { nums: [28, 54, 7, -70, 22, 65, -6], k: 100, out: 1 }
]