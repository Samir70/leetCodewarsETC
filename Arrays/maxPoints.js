// https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/
// beats 94%
var maxScore = function(cardPoints, k) {
    let len = cardPoints.length;
    let sum = cardPoints.slice(0, k).reduce((a, b) => a+b, 0);
    if (k === len) {return sum}
    let left = len, right = k;
    let max = sum;
    while (right > 0) {
        right--; left--;
        sum += cardPoints[left] - cardPoints[right]
        if (sum > max) {max = sum}
    }
    return max
};

/**
 * alt method was to find sum of all, and investigate windows of size len - k
 * sum of that needs to be taken from sum of all.
 * but surely that takes longer for small k and large arrays.
 */