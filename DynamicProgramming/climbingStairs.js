// How many ways to climb n steps 
// if you can take either one or two steps each turn
var climbStairs = function (n) {
    var waysForIdx = [0, 1, 2];
    var i = 3;
    while (i <= n) {
        var afterOneStep = waysForIdx[i - 1];
        var afterTwoSteps = waysForIdx[i - 2];
        waysForIdx.push(afterOneStep + afterTwoSteps);
        i++
    }
    return waysForIdx[n]
};

// use less memory, since you only need the last two elements
// beats 96% on speed, but only 13% on mem
var climbStairs = function (n) {
    if (n <= 2) { return n }
    let [a, b] = [1, 2];
    let i = 2;
    while (i < n) {
        [a, b] = [b, a + b];
        i++
    }
    return b
};

/**
 * note the method of 
 * -- brute force recursion, calling function for smaller values
 * -- optimise with memoisation
 * -- use array to store previous (as above)
 * -- actually only need two previous values, so can manage in O(1) space
 */

const tests = [1, 2, 8, 45, 46, 60]
const answers = [1, 2, 34, 1836311903, 2971215073, 2504730781961];

tests.forEach((t, i) => console.log(
    climbStairs(t), 'should be', answers[i]
));