/**
 * @param {number[]} nums
 * @return {number[]}
 */
var rearrangeArray = function (nums) {
  let out = []
  let positive = [], negative = []
  for (let n of nums) {
    if (n < 0) {
      negative.push(n)
    } else { positive.push(n) }
  }
  let i = 0;
  while (out.length < nums.length) {
    out.push(positive[i], negative[i])
    i++
  }
  return out
};

const tests = [
  { args: [[3, 1, -2, -5, 2, -4]], out: [3, -2, 1, -5, 2, -4] },
  { args: [[-1, 1]], out: [1, -1] },
];

tests.forEach((t, i) => {
  let res = rearrangeArray(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});