/**
 * @param {number} n
 * @return {number}
 */
const destinations = {
  0: [4, 6],
  1: [8, 6],
  2: [7, 9],
  3: [4, 8],
  4: [3, 9, 0],
  5: [],
  6: [1, 7, 0],
  7: [2, 6],
  8: [1, 3],
  9: [2, 4],
}
const digits = [..."123467890"].map(Number)
const base = 10**9 + 7
var knightDialer = function (n) {
  let prev = Array(10).fill(1)
  for (let i = 1; i < n; i++) {
    let cur = Array(10).fill(0) 
    for (let d of digits) {
      destinations[d].forEach(dest => {
        cur[d] += prev[dest]
        cur[d] %= base
      })
    }
    prev = [...cur]
  }
  out = 0;
  prev.forEach(v => {
    out += v
    out %= base
  })
  return out
};

const tests = [
  { args: [1], out: 10 },
  { args: [2], out: 20 },
  { args: [3131], out: 136006598 },
];

tests.forEach((t, i) => {
  let res = knightDialer(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});