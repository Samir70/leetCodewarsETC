/**
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */
const countBits = (n) => n === 0 ? 0 : 1 + countBits(n & (n - 1));

var minBitFlips = function (start, goal) {
  // turned out to be slower
  let diffs = start ^ goal
  return countBits(diffs)
};
// var minBitFlips = function (start, goal) {
//   let [a, b] = [start, goal].map(n => n.toString(2))
//   while (a.length < b.length) { a = "0" + a }
//   while (b.length < a.length) { b = "0" + b }
//   // console.log({ a, b })
//   let count = 0
//   for (let i = 0; i < a.length; i++) {
//     if (a[i] !== b[i]) { count++ }
//   }
//   return count
// };

const tests = [
  { args: [10, 7], out: 3 },
  { args: [3, 4], out: 3 },
];

tests.forEach((t, i) => {
  let res = minBitFlips(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});