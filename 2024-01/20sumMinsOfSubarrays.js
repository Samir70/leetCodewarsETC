/**
 * @param {number[]} arr
 * @return {number}
 */
const base = 10 ** 9 + 7
const multMod = (a, b) => {
  let out = 0;
  while (b > 0) {
      if (b%2) {out = (out + a) % base}
      a = (a + a) % base;
      b = b >> 1
  }
  return out
}
var sumSubarrayMins = function (arr) {
  let stack = [{ val: -Infinity, idx: -1 }, { val: arr[0], idx: 0 }]
  const last = () => stack[stack.length - 1]
  let leftMostIdxOfSubarrayIncI = [0]
  for (let i = 1; i < arr.length; i++) {
    let idx = i;
    while (last().val > arr[i]) {
      let cur = stack.pop()
      idx = cur.idx
    }
    stack.push({ val: arr[i], idx })
    leftMostIdxOfSubarrayIncI.push(idx)
  }
  let rightMostIdxOfSubarrayIncI = Array(arr.length).fill(false)
  stack = [
    { val: -Infinity, idx: arr.length },
    { val: arr[arr.length - 1], idx: arr.length - 1 }
  ]
  for (let i = arr.length - 1; i >= 0; i--) {
    let idx = i;
    while (last().val >= arr[i]) {
      let cur = stack.pop()
      idx = cur.idx
    }
    stack.push({ val: arr[i], idx })
    rightMostIdxOfSubarrayIncI[i] = idx
  }
  // console.log({leftMostIdxOfSubarrayIncI, rightMostIdxOfSubarrayIncI})
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    let left = leftMostIdxOfSubarrayIncI[i]
    let right = rightMostIdxOfSubarrayIncI[i]
    let leftChoices = i - left + 1
    let rightChoices = right - i + 1
    let numSubarraysIncIdx = (leftChoices * rightChoices)
    sum += multMod(numSubarraysIncIdx, arr[i])
    sum %= base
    // console.log({n: arr[i], leftChoices, rightChoices})
  }
  return sum
};
// TLE, but right answer
var sumSubarrayMinsSlow = function (arr) {
  let sum = arr[0]
  for (let i = 1; i < arr.length; i++) {
    let minSoFar = arr[i]
    for (let j = i; j >= 0; j--) {
      minSoFar = Math.min(minSoFar, arr[j])
      sum += minSoFar
      // sum %= base
    }
  }
  return sum
};

const { bigtest } = require("./20bigtest")
const { bigtest2 } = require("./20bigtest2")

const tests = [
  { args: [[3, 1, 2, 4]], out: 17 },
  { args: [[11, 81, 94, 43, 3]], out: 444 },
  { args: [[11, 81, 94, 43, 3, 5, 10, 12, 2]], out: 554 },
  { args: [[11, 11, 81, 94, 43, 3, 5, 10, 12, 2]], out: 623 },
  { args: [bigtest], out: 628421304 },
  { args: [bigtest2], out: 648386733 }
];

tests.forEach((t, i) => {
  let res = sumSubarrayMins(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});