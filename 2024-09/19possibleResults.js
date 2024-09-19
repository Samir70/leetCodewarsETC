/**
 * @param {string} expression
 * @return {number[]}
 * improvements: https://leetcode.com/problems/different-ways-to-add-parentheses/editorial/
 */
const ops = new Set([..."*+-"])
var diffWaysToCompute = function (expression) {
  if (expression === "") { return [] }
  if (expression.length < 3) { return [Number(expression)] }
  let res = []
  for (let i = 0; i < expression.length; i++) {
    let cur = expression[i]
    if (!ops.has(cur)) { continue }
    let [left, right] = [expression.slice(0, i), expression.slice(i + 1)]
    let leftRes = diffWaysToCompute(left)
    let rightRes = diffWaysToCompute(right)
    for (let lv of leftRes) {
      for (let rv of rightRes) {
        switch (cur) {
          case "*": { res.push(lv * rv); break }
          case "+": { res.push(lv + rv); break }
          case "-": { res.push(lv - rv); break }
          default: { console.log("oops!!!!!!") }
        }
      }
    }
    // console.log({ left, cur, right, leftRes, rightRes })
  }
  return res
};

const tests = [
  { args: ["2-1-1"], out: [0, 2] },
  { args: ["2*3-4*5"], out: [-34, -14, -10, -10, 10] },
  { args: ["3-4*5"], out: [-17, -5] },
];

const compArrs = (arr1, arr2) => {
  if (arr1.length !== arr2.length) { return false }
  arr1.sort(); arr2.sort()
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) { return false }
  }
  return true
}

tests.forEach((t, i) => {
  let res = diffWaysToCompute(...t.args);
  if (!compArrs(res, t.out)) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});