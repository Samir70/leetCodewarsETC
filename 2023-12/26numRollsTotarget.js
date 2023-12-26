/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
const base = 10 ** 9 + 7
const multMod = (a, b) => {
  let out = 0;
  while (b > 0) {
    if (b % 2) { out = (out + a) % base }
    a = (a + a) % base;
    b = b >> 1
  }
  return out
}
const pairUp = t => {
  out = []
  for (let a = 1; a < t; a++) {
    out.push([a, t - a])
  }
  return out
}
var numRollsToTarget = function (n, sides, target) {
  if (target < n || target > n * sides) { return 0 }
  // start with ways to get scores up to target with one dice
  let oneDie = [0], diceCounted = 1
  for (let t = 1; t <= target; t++) {
    oneDie.push(t <= sides ? 1 : 0)
  }
  let prev = [...oneDie]
  while (diceCounted < n) {
    let cur = Array(target+1).fill(0)
    diceCounted++
    for (let t = diceCounted; t <= target; t++) {
      let pairs = pairUp(t)
      // console.log(pairs)
      for (let [a, b] of pairs) {
        cur[t] += multMod(oneDie[a], prev[b])
        cur[t] %= base
      }
    }
    prev = [...cur]
    // console.log(prev)
  }
  return prev[target]
};

const tests = [
  { args: [1, 6, 3], out: 1 },
  { args: [2, 6, 6], out: 5 },
  { args: [2, 6, 7], out: 6 },
  { args: [2, 6, 12], out: 1 },
  { args: [20, 6, 7], out: 0 },
  { args: [30, 30, 500], out: 222616187 },
];

tests.forEach((t, i) => {
  let res = numRollsToTarget(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});