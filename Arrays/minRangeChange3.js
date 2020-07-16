// Change 3 elements in nums to give a result with min range

var minDifference = function(nums) {
    var unchanged = nums.length - 3;
    if (unchanged <=1) {return 0}
    var sorted = [...nums].sort((a, b) => a-b);
    var left = 0, right = unchanged - 1;
    var minDiff = Infinity;
    while (right < nums.length) {
        var diff = sorted[right] - sorted[left];
        if (diff<minDiff) {minDiff = diff}
        left++
        right++
    }
    return minDiff
};

/**
 * leetman
 * Our options to remove elements are only to remove 3 elements 
 * out of the combined list of first 3 and last 3. 
 * Why remove? 
 * because removing is the same as changing value to some median value (easy to prove).
    - remove 0 from left and 3 from right
    - remove 1 from left and 2 from right
    - remove 2 from left and 1 from right
    - remove 3 from left and 0 from right
 * in fact, don't need to sort. Only need to find four smallest and four largets
 * use a heap
 */