/*
https://leetcode.com/problems/daily-temperatures/
 return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. 
 If there is no future day for which this is possible, keep answer[i] == 0 instead.
*/

var dailyTemperatures = function (temps) {
  let out = Array(temps.length).fill(0);
  let i = temps.length - 1;
  let stack = [];
  while (i >= 0) {
    let cur = temps[i]
    while (stack.length && stack[stack.length - 1][0] <= cur) { stack.pop() }
    out[i] = stack.length ? stack[stack.length - 1][1] - i : 0
    stack.push([cur, i])
    i--
  }
  return out
};


const tests = [
  { args: [[73, 74, 75, 71, 69, 72, 76, 73]], out: [1, 1, 4, 2, 1, 1, 0, 0] },
  { args: [[69, 74, 75, 71, 69, 72, 76, 73]], out: [1, 1, 4, 2, 1, 1, 0, 0] },
  { args: [[30, 40, 50, 60]], out: [1, 1, 1, 0] },
  { args: [[30, 60, 90]], out: [1, 1, 0] },
];

tests.forEach((t, i) => {
  let res = dailyTemperatures(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});