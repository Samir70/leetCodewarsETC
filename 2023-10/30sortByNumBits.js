/**
 * @param {number[]} arr
 * @return {number[]}
 */
const countbits = n => n === 0 ? 0 : 1 + countbits((n - 1) & n)
var sortByBits = function (arr) {
  let hash = {}
  for (let n of arr) {
    hash[n] = countbits(n)
  }
  return arr.sort((a, b) => hash[a] === hash[b] ? a - b : hash[a] - hash[b])
};

const tests = [
  { args: [[0, 1, 2, 3, 4, 5, 6, 7, 8]], out: [0, 1, 2, 4, 8, 3, 5, 6, 7] },
  { args: [[1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]], out: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024] },
];

tests.forEach((t, i) => {
  let res = sortByBits(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});