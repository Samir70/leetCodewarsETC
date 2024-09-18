/**
 * @param {number[]} nums
 * @return {string}
 */
const bestNum = (a, b) => {
  if (a[0] === b[0]) {
    let [ab, ba] = [a + b, b + a]
    return ab === ba ? 0 : ab < ba ? 1 : -1
  } else {
    return a[0] < b[0] ? 1 : -1
  }
}
var largestNumber = function (nums) {
  let strs = nums.map(n => "" + n)
    .sort(bestNum)
  if (strs[0] === "0") { return "0" }
  return strs.join("")
};

const tests = [
  { args: [[10, 2]], out: "210" },
  { args: [[3, 30]], out: "330" },
  { args: [[3, 34]], out: "343" },
  { args: [[0, 0, 0]], out: "0" },
  { args: [[1, 0, 0]], out: "100" },
  { args: [[34, 345]], out: "34534" },
  { args: [[34, 35]], out: "3534" },
  { args: [[34, 341]], out: "34341" },
  { args: [[3, 30, 34, 5, 9]], out: "9534330" },
  { args: [[31, 30, 34, 5, 9]], out: "95343130" },
  { args: [[31, 305, 34, 5, 9]], out: "953431305" },
  { args: [[34323, 3432]], out: "343234323" },
];

tests.forEach((t, i) => {
  let res = largestNumber(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});