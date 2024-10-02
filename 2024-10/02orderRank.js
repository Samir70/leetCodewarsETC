/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function (arr) {
  let nums = new Set([...arr])
  nums = [...nums].sort((a, b) => a - b)
  let rank = {}
  let i = 1
  for (let n of nums) { rank[n] = i++ }
  return arr.map(n => rank[n])
};

const tests = [
  { args: [[40, 10, 20, 30]], out: [4, 1, 2, 3] },
  { args: [[100, 100, 100]], out: [1, 1, 1] },
  { args: [[37, 12, 28, 9, 100, 56, 80, 5, 12]], out: [5, 3, 4, 2, 8, 6, 7, 1, 3] },
];

tests.forEach((t, i) => {
  let res = arrayRankTransform(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});