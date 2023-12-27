/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function (colors, neededTime) {
  let time = 0
  let cur = ""
  let times = []
  colors += "?"
  neededTime.push(0)
  for (let i = 0; i < colors.length; i++) {
    let c = colors[i]
    let t = neededTime[i]
    if (c === cur) {
      times.push(t)
    } else {
      if (times.length > 1) {
        time += times.reduce((a, c) => a + c) - Math.max(...times)
      }
      cur = c
      times = [t]
    }
  }
  return time
};

const tests = [
  { args: ["abaac", [1, 2, 3, 4, 5]], out: 3 },
  { args: ["abc", [1, 2, 3]], out: 0 },
  { args: ["aabaa", [1, 2, 3, 4, 1]], out: 2 },
  { args: ["bbbaaa", [4, 9, 3, 8, 8, 9]], out: 23 },
];

tests.forEach((t, i) => {
  let res = minCost(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});