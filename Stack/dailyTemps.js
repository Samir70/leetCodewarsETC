/*
https://leetcode.com/problems/daily-temperatures/
 return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. 
 If there is no future day for which this is possible, keep answer[i] == 0 instead.
*/

var dailyTemperatures = function(temps) {
    let out = Array(temps.length).fill(0);
    let i = temps.length - 1;
    let stack = [];
    while (i >= 0) {
        let cur = temps[i]
        while (stack.length && stack[stack.length - 1][0] <= cur) {stack.pop()}
        out[i] = stack.length ? stack[stack.length - 1][1] - i : 0
        stack.push([cur, i])
        i--
    }
    return out
};
