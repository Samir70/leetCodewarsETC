/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  if (nums.length === 1) { return nums }
  let mid = Math.floor(nums.length / 2)
  let left = sortArray(nums.slice(0, mid))
  let right = sortArray(nums.slice(mid))
  return merge(left, right)
};
const merge = (a, b) => {
  if (b.length === 0) { return a }
  let out = []
  let [i, j] = [0, 0]
  // console.log("merging", { a, b })
  while (i < a.length || j < b.length) {
    // console.log({ i, j, a: a[i], b: b[j] })
    if (i >= a.length) {
      out.push(b[j++])
      continue
    }
    if (j >= b.length) {
      out.push(a[i++])
      continue
    }
    if (a[i] <= b[j]) {
      out.push(a[i++])
    } else {
      out.push(b[j++])
    }
  }
  return out
}

const bigArray = []
for (let i = 0; i < 1000000; i++) {
  bigArray.push(Math.random() * 10000)
}
let bigSorted = [...bigArray].sort((a, b) => a - b)
const tests = [
  { args: [[5, 2, 3, 1]], out: [1, 2, 3, 5] },
  { args: [[5, 1, 1, 2, 0, 0]], out: [0, 0, 1, 1, 2, 5] },
  { args: [bigArray], out: bigSorted },
];

tests.forEach((t, i) => {
  let res = sortArray(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});