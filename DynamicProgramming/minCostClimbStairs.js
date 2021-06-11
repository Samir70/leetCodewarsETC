/**
 * Landing on step i has cost cost[i];
 * find minimum of reaching the landing
 * 
 * Each cost is non-negative, stepping on top landing is free
 * https://leetcode.com/problems/min-cost-climbing-stairs/
 */

var minCostClimbingStairs = function(cost) {
    var totalCost = Array(cost.length+2).fill(0)
    var i = cost.length-1;
    // console.log(cost)
    while (i >= 0) {
        totalCost[i] = cost[i] + Math.min(totalCost[i+1], totalCost[i+2])
        // console.log(i, totalCost)
        i--
    }
    return Math.min(totalCost[0], totalCost[1])
};
// Can be done in O(1) space

const tests = [
    {cost:[10, 15, 20], out:15},
    {cost:[1, 100, 1, 1, 1, 100, 1, 1, 100, 1], out:6}, 
    {cost:[0,2,2,1], out:2}
]

tests.forEach((t, i) => console.log(
    'test', i, minCostClimbingStairs(t.cost), 'should be', t.out
))
