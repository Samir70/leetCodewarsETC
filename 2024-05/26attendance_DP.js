/**
 * @param {number} n
 * @return {number}
 */
const base = 10 ** 9 + 7
var checkRecord = function (n) {
  let prev = [[1, 0, 0], [0, 0, 0]]
  let cur = [[0, 0, 0], [0, 0, 0]]
  for (let day = 0; day < n; day++) {
    cur = [[0, 0, 0], [0, 0, 0]]
    for (let abs = 0; abs < 2; abs++) {
      for (let late = 0; late < 3; late++) {
        // choose P
        cur[abs][0] += prev[abs][late]
        cur[abs][0] = cur[abs][0] % base
        // choose A
        if (abs === 0) {
          cur[1][0] += prev[0][late]
          cur[1][0] = cur[1][0] % base
        }
        // choose L
        if (late < 2) {
          cur[abs][late + 1] += prev[abs][late]
          cur[abs][late + 1] = cur[abs][late + 1] % base
        }
      }
    }
    prev[0] = [...cur[0]]
    prev[1] = [...cur[1]]
  }
  // console.log(cur)
  return (cur[0].reduce((a, c) => a + c) + cur[1].reduce((a, c) => a + c)) % base
};
// following TLEs
// var checkRecord = function (n) {
//   let memo = []
//   for (let i = 0; i < n; i++) {
//     memo.push([[-1, -1, -1], [-1, -1, -1]])
//   }
//   const dp = (day, absCount, lateCount) => {
//     if (day === n) { return 1 }
//     if (memo[day][absCount][lateCount] !== -1) {
//       return memo[day][absCount][lateCount]
//     }
//     let [markAbs, markLate, markPresent] = [0, 0, 0]
//     if (absCount === 0) {
//       markAbs = dp(day + 1, 1, 0)
//     }
//     if (lateCount < 2) {
//       markLate = dp(day + 1, absCount, lateCount + 1)
//     }
//     markPresent = dp(day + 1, absCount, 0)
//     let total = (markAbs + markLate + markPresent) % base
//     memo[day][absCount][lateCount] = total
//     return total
//   }
//   return dp(0, 0, 0)
// };

const tests = [
  { args: [1], out: 3 },
  { args: [2], out: 8 },
  { args: [3], out: 19 },
  { args: [4], out: 43 },
  { args: [5], out: 94 },
  { args: [6], out: 200 },
  { args: [7], out: 418 },
  { args: [8], out: 861 },
  { args: [9], out: 1753 },
  { args: [10101], out: 183236316 },
];

tests.forEach((t, i) => {
  let res = checkRecord(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});