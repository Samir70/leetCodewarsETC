/**
 * @param {string[]} arr
 * @param {number} k
 * @return {string}
 */
var kthDistinct = function (arr, k) {
  let seen = new Set(), distinct = new Set()
  for (let s of arr) {
    if (seen.has(s)) {
      distinct.delete(s)
    } else {
      seen.add(s)
      distinct.add(s)
    }
  }
  let distArr = []
  for (let s of arr) {
    if (distinct.has(s)) {distArr.push(s)}
  }
  return distArr.length >= k ? distArr[k - 1] : ""
};

const tests = [
  { args: [["d", "b", "c", "b", "c", "a"], 2], out: "a" },
  { args: [["aaa", "aa", "a"], 1], out: "aaa" },
  { args: [["a", "b", "a"], 3], out: "" },
];

tests.forEach((t, i) => {
  let res = kthDistinct(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});